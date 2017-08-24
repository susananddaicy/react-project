import Stack from '../../utils/Stack';
import PageStore from './PageStore';
import Console from '../../utils/Console';
import HashUtils from '../../utils/HashUtils';

const console = new Console(false);

/**
 * PageView类，存储页面参数
 */
class PageView {
  /**
   * PageView构造函数
   * @param {Object} viewOpt 页面参数
   */
  constructor(viewOpt) {
    // pathname = path + query
    this.path = viewOpt.path; //  index 根据path去定位页面
    this.query = viewOpt.query; //  ?from=xxx&param=1
    this.from = viewOpt.from; //  from:'' // 记录外链入口
    this.back = viewOpt.back; //  /home // 用来覆盖默认返回
    this.redirect = viewOpt.redirect; // 是否是landing跳转页
    this.current = viewOpt.current; // native中当前容器打开与回退
  }

  /**
   * 序列化页面参数
   */
  toString() {
    return JSON.stringify({
      path: this.path,
      query: this.query,
      from: this.from,
      back: this.back,
      redirect: this.redirect,
      current: this.current,
    });
  }
}

/**
 * PageManager类，提供页面页面管理与页面跳转，应用于Page中
 */
class PageManager {
  /**
   * PageManager构造函数
   */
  constructor() {
    this.VERSION = '201610101400'; // NOTICE: if data structure changed, clear user old storage
    this.pageStack = new Stack();
    this.context = null;
    this.entry = {
      channel: '', // 记录入口渠道
      from: '', // 记录入口url
      to: '', // 记录出口url
    };
    this.initialize();
  }

  /**
   * Bind page context and push stack
   * @param pageContext 页面context
   */
  bind(pageContext) {
    this.context = pageContext;

    const viewPath = this.context.getViewPath();
    const viewQuery = this.context.getViewQuery();
    let viewFrom = this.context.getViewFrom();
    const viewBack = this.context.getViewBack();
    const viewRedirect = this.context.getViewRedirect();
    const viewCurrent = this.context.getViewCurrent();

    if (viewFrom) {
      viewFrom = decodeURIComponent(viewFrom);
    }
    this.setViewEntry(viewQuery);

    let view = this.searchView(viewPath);
    if (view) {
      this.popViews(viewPath);
      // 无论是forward/back/jump,参数保持更新
      this.updateTopView({
        path: viewPath,
        query: viewQuery,
        from: viewFrom,
        back: viewBack,
        redirect: viewRedirect,
        current: viewCurrent,
      });
    } else {
      view = new PageView({
        path: viewPath,
        query: viewQuery,
        from: viewFrom,
        back: viewBack,
        redirect: viewRedirect,
        current: viewCurrent,
      });
      this.pageStack.push(view);
    }

    // update store when shown
    this.setStore();

    // TODO DEBUG
    this.pageStack.print();
  }

  /**
   * 页面向前跳转
   * @param {String} viewPath eg:index
   * @param {Object} options {query, state, params}
   */
  forward(viewPath, options) {
    // 延时处理，防重
    const now = Date.now();
    if (options && options.debounce && this.last && now - this.last < 500) {
      return;
    }
    this.last = now;
    this.goForward(viewPath, options);
  }

  /**
   * 页面回退
   * @param {String} viewPath
   */
  back(viewPath) {
    if (!!viewPath) {
      const retview = this.searchView(viewPath, true);
      if (retview) {
        const viewRedirect = retview.redirect;
        if (viewRedirect) {
          console.warn('PageManager: back by view redirect.');
          this.back();
        } else {
          console.warn('PageManager: back by view exist in stack.');
          this.goBack(retview.path, {
            query: retview.query,
          });
        }
      } else {
        console.warn('PageManager: back by view non-exist in stack.');
        this.goBack(viewPath);
      }
    } else {
      // No specified view, use default return logic.(from > back > stack > default)
      const curview = this.pageStack.pop();
      const viewFrom = curview.from;
      const viewBack = curview.back;
      const viewRedirect = curview.redirect;
      const viewCurrent = curview.current;
      console.log('viewFrom:' + viewFrom);
      console.log('viewBack:' + viewBack);
      // from参数主要用于h5跨系统跳转,包括h5渠道和app中当前webview打开跨系统页面
      if (viewFrom) {
        console.warn('PageManager: back by from.');
        this.jump(viewFrom, {
          isBack: true,
          current: viewCurrent,
        });
        this.setStore();
      } else if (viewBack) {
        console.warn('PageManager: back by back.');
        this.back(viewBack);
      } else if (!viewRedirect && !this.pageStack.isEmpty()) {
        console.warn('PageManager: back by stack.');
        const retview = this.pageStack.top();
        this.back(retview.path);
      } else {
        console.warn('PageManager: back by default.');
        this.goBack();
      }
    }
  }

  /**
   * @description 跨系统跳转，或跨webview跳转
   * @author yanjj
   * @param       {String} viewurl 跳转目标url
   * @param       {Object} options 跳转参数，如是否返回
   */
  jump(viewurl, options = {}) {
    // 延时处理，防重
    const now = Date.now();
    if (options && options.debounce && this.last && now - this.last < 500) {
      return;
    }
    this.last = now;
    this.setStore();
    this.goJump(viewurl, options);
  }

  /**
   * @description 关闭webview，在app中使用
   * @author yanjj
   */
  close(options) {
    // needRefresh :'1' 关闭当前webview，刷新底下webview
    PageParser.popView(options);
  }

  /**
   * 清除页面存储信息
   * @param {String} viewPath
   */
  clear() {
    PageStore.remove();
    this.pageStack.clear();
  }

  /**
   * 设置系统入口信息
   * @param {Object} entryOpt
   */
  setViewEntry(entryOpt) {
    let viewFrom = entryOpt.from;
    if (viewFrom) {
      viewFrom = decodeURIComponent(viewFrom);
    }
    entryOpt.channel && (this.entry.channel = entryOpt.channel);
    entryOpt.from && (this.entry.from = viewFrom);
    entryOpt.to && (this.entry.to = entryOpt.to);
  }

  /**
   * 获取系统入口信息
   * @return {Object}
   */
  getViewEntry() {
    return this.entry;
  }

  resetViewEntry() {
    this.entry = {
      channel: '',
      from: '',
      to: '',
    };
  }

  /**
   * 设置页面信息
   * @param {String} viewPath
   * @param {Object} entryOpt
   */
  setViewOption(viewPath, viewOpt) {
    const view = this.searchView(viewPath);
    viewOpt.query && (view.query = viewOpt.query);
    viewOpt.from && (view.from = viewOpt.from);
    viewOpt.back && (view.back = viewOpt.back);
  }

  /**
   * 获取页面数量
   * @return {Int}
   */
  getPageSize() {
    return this.pageStack.length();
  }

  /**
   * 读取stack持久化数据
   * @description private
   */
  readStore() {
    console.log('PageManager: read store.');
    const version = PageStore.getAttr('version');
    if (!version || version !== this.VERSION) {
      console.log('PageManager: version update from ' + version + ' to ' + this.VERSION);
      this.clearStore(true);
      return;
    }

    const pageStack = PageStore.getAttr('stack');
    if (pageStack) {
      this.pageStack = this.pageStack.deserialize(pageStack);
    }
    const pageEntry = PageStore.getAttr('entry');
    if (pageEntry) {
      this.entry = JSON.parse(pageEntry);
    }
  }

  /**
   * 设置stack持久化数据
   * @description private
   */
  setStore() {
    console.log('PageManager: set store.');
    PageStore.setAttr('version', this.VERSION);
    PageStore.setAttr('stack', this.pageStack.serialize());
    PageStore.setAttr('entry', JSON.stringify(this.entry));
  }

  /**
   * 清空stack持久化数据
   * @description private
   */
  clearStore(update) {
    console.log('PageManager: clear store.');
    if (update) {
      PageStore.remove();
    }
    PageStore.removeAttr('stack');
    PageStore.removeAttr('entry');
    this.pageStack.clear();
    this.resetViewEntry();
  }

  /**
   * 实际调用路由向前跳转
   * @description private
   */
  goForward(viewPath, options) {
    let myViewPath = null;
    if (!viewPath) {
      console.error('PageManager: should set forward viewpath.');
    } else {
      if (viewPath.indexOf('/') < 0) {
        myViewPath = '/' + viewPath;
      }
      const targetRoute = {
        pathname: myViewPath,
      };
      options && options.query && (targetRoute.query = options.query);
      options && options.state && (targetRoute.state = options.state);

      this.context.context.router.push(targetRoute);
    }
  }

  /**
   * 实际调用路由向后跳转
   * TODO 调用路由跳转向前与向后一致，需要处理
   * @description private
   */
  goBack(viewPath, options) {
    let myViewPath = null;
    if (!viewPath) {
      window.history.go(-1);
    } else {
      if (viewPath.indexOf('/') < 0) {
        myViewPath = `/${viewPath}`;
      }
      const targetRoute = {
        pathname: myViewPath,
      };
      options && options.query && (targetRoute.query = options.query);
      options && options.state && (targetRoute.state = options.state);

      // Notice LuPage this is back action
      if (!targetRoute.state) targetRoute.state = {};
      targetRoute.state.isBack = true;

      // TODO push is a question in back action
      this.context.context.router.push(targetRoute);
    }
  }

  /**
   * 系统间跳转
   * 支持三种情况 1:h5中统一浏览器tab打开 2:app新开webview打开 3:app在当前webview打开
   * @description private
   */
  goJump(viewurl, options = {}) {
    const current = options.current;
      const from = window.location.href;
      const jumpUrl = options.isBack ? viewurl : HashUtils.addQueryParam(viewurl, {
        from: encodeURIComponent(from),
      });
      window.location.href = jumpUrl;
  }

  /**
   * 在page stack中查找page
   * TODO need optimize
   * @description private
   * search view. whether pop views above it after find it
   * @param {String} viewPath
   * @param {Boolean} pop 是否退栈
   */
  searchView(viewPath, pop) {
    let viewret = null;
    let tempStack = new Stack();

    const pageStackLen = this.pageStack.length();
    for (let i = 0; i < pageStackLen; i++) {
      const viewitem = this.pageStack.top();
      if (viewitem.path !== viewPath) {
        console.warn('search view:' + viewitem.path);
        tempStack.push(this.pageStack.pop());
      } else {
        viewret = viewitem;
        break;
      }
    }

    if (!pop) {
      const tempStackLen = tempStack.length();
      for (let i = 0; i < tempStackLen; i++) {
        this.pageStack.push(tempStack.pop());
      }
    }
    tempStack = null;

    return viewret;
  }

  /**
   * 弹出指定page以上的pages
   * TODO need optimize
   * @description private
   * @param  {String} viewPath
   * @return {Object}
   */
  popViews(viewPath) {
    let viewret = null;
    const pageStackLen = this.pageStack.length();
    for (let i = 0; i < pageStackLen; i++) {
      viewret = this.pageStack.top();
      if (viewret.path !== viewPath) {
        this.pageStack.pop();
      } else {
        break;
      }
    }
    return viewret;
  }

  /**
   * 更新指定page的参数
   * @description private
   */
  updateTopView(viewOpt) {
    if (!this.pageStack.isEmpty()) {
      const view = this.pageStack.top();
      view.path = viewOpt.path;
      view.query = viewOpt.query;
      view.from = viewOpt.from;
      view.back = viewOpt.back;
    }
  }

  /**
   * 判断是否是顶层page
   * @description private
   */
  isTopView(viewPath) {
    if (!this.pageStack.isEmpty()) {
      const view = this.pageStack.top();
      return view.path === viewPath;
    }
    return false;
  }

  /**
   * 初始化
   * @description private
   */
  initialize() {
    this.readStore();
  }

  /**
   * 获取PageManager单例对象
   */
  static getInstance() {
    if (!this.instance || !(this.instance instanceof PageManager)) {
      this.instance = new this();
    }
    return this.instance;
  }

}

export default PageManager;
