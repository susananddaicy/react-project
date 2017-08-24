import React, {
  Component,
} from 'react';
import _ from 'lodash';
import PageManager from './PageManager';
import Console from '../../utils/Console';
const console = new Console(false);

class Page extends Component {
  constructor(props, options = {}) {
    super(props);
    // set options for page
    this.options = options;
    
    const state = this.getState() || {};
    // set back flag for page
    this.isBack = !!state.isBack;

    // set page attribute
    this.backTo = options.backTo || '';
    this.redirect = !!options.redirect;

    // bind PageManager
    this.pageManager = PageManager.getInstance();
    this.pageManager.bind(this);

    const arrHandler = [
      'setTitle',
      'showDialog',
      'hideDialog',
      'onBack',
    ];
    arrHandler.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }

   shouldComponentUpdate(nextProps, nextState) {
     return !_.isEqual(this.props, nextProps) && !_.isEqual(this.state, nextState);
   }


  componentWillUnmount() {
  }

 setTitle(options) {
    const mOpts = options;
    if (mOpts.leftView) { // true/Object
      if (!_.isPlainObject(mOpts.leftView)) { // leftView: true
        mOpts.leftView = {};
      }
      mOpts.leftView.callback = this.onBack;
    }
    this.setHeadTitle(mOpts);
  }

  setHeadTitle(options) {
    const tOpts = options;
    if (typeof tOpts.naviBar === 'undefined') {
      throw new Error('Header.setTitle: options.naviBar should not be undefined, Please check params');
    }
      // navBar样式
      const navBar = {
        fixed: true,
        style: {
          color: options.naviBar.titleColor ? `#${options.naviBar.titleColor}` : '',
          background: options.naviBar.color ? `#${options.naviBar.color}` : '',
        },
      };
      // left 样式
      const leftView = options.leftView ? {
        text: '',
        style: {
          color: options.leftView && options.leftView.color ? `#${options.leftView.color}` : '',
        },
        onClick: options.leftView ? options.leftView.callback : () => {},
      } : null;
      // right 样式
      const rightView = options.rightView ? {
        text: options.rightView.title,
        style: {
          color: options.rightView.color ? `#${options.rightView.color}` : '',
        },
        onClick: options.rightView.callback ? options.rightView.callback : () => {},
      } : null;
      // 中间样式
      const centerView = this.getCenterViewOptions(options);
      const opts = {
        navBar,
        leftView,
        rightView,
        centerView,
      };
      this.context.setTitle(opts);
    
  }

  
  getCenterViewOptions(options) {
    let centerView = {};
    if (!options.centerView) {
      centerView = {
        data: {
          text: options.naviBar.title,
          style: {
            color: options.naviBar.titleColor ? `#${options.naviBar.titleColor}` : '',
          },
        },
        type: 'common', // 默认样式
      };
    } else if (options.centerView.type === '0') {
      centerView = {
        data: {
          text: options.centerView.title,
          style: {
            color: options.centerView.color ? `#${options.centerView.color}` : '',
          },
        },
        type: 'common', // 默认样式
      };
    } else if (options.centerView.type === '1') {
      centerView = {
        data: {
          items: options.centerView.titles ? options.centerView.titles : [],
          onClick: options.centerView.callback ? options.centerView.callback : () => {},
          selectedIndex: options.centerView.selectedIndex,
          style: {
            color: options.centerView.color ? `#${options.centerView.color}` : '',
          },
        },
        type: 'tab',
      };
    } else if (options.centerView.type === '2') {
      // TODO
      throw new Error('Header.setTitle: doesnt support!');
    }
    return centerView;
  }


  showDialog(dialog) {
    if (dialog.buttons) {
      dialog.buttons.forEach((item) => {
        if (!item.onClick) {
          item.onClick = this.hideDialog;
        }
      });
    } else {
      dialog.buttons = [{
        label: '确定',
        onClick: this.hideDialog,
      }];
    }

    this.context.showDialog(dialog);
  }

  /**
   * 调用隐藏dialog
   * @description 禁止在render中使用
   */
  hideDialog() {
    this.context.hideDialog();
  }


  /**
   * 获取view path信息，即hash
   * @description private
   * @return {String}
   */
  getViewPath() {
    const viewname = this.props.location.pathname.replace('/', '');
    return viewname;
  }

  /**
   * 获取view query信息
   * @description private
   * @return {Object}
   */
  getViewQuery() {
    // react-router this.props.location.query just a reference to query.
    // it should be clone before push into page stack.
    const viewquery = _.extend({}, this.props.location.query);
    return viewquery;
  }

  /**
   * 获取view from信息
   * @description private
   * @return {String}
   */
  getViewFrom() {
    return this.props.location.query.from;
  }

  /**
   * 获取view back信息
   * @description private
   * @return {String}
   */
  getViewBack() {
    return this.backTo;
  }

  /**
   * 获取view redirect信息
   * @description private
   * @return {String}
   */
  getViewRedirect() {
    return this.redirect;
  }

  /**
   * 获取view current信息,是否在当前容器打开或返回
   * @description private
   * @return {String}
   */
  getViewCurrent() {
    return this.props.location.query.current === 'true';
  }

  /**
   * 设置view信息
   * @param {Object} options
   */
  setViewOption(options) {
    const viewpath = this.getViewPath();
    this.pageManager.setViewOption(viewpath, options);
  }

  /**
   * 获取view入口信息
   * @return {String}
   */
  getViewEntry() {
    return this.pageManager.getViewEntry();
  }

  /**
   * 页面向前跳转
   * @param {String} viewpath
   * @param {Object} options
   */
  forward(viewpath, options) {
    this.pageManager.forward(viewpath, options);
  }

  /**
   * 页面向后跳转
   * @param {String} viewpath
   * @param {Object} options
   */
  back(viewpath, options) {
    this.pageManager.back(viewpath, options);
  }

  /**
   * 页面跨系统跳转
   * @param       {String} viewurl 目标系统完整url
   * @param       {Object} options
   */
  jump(viewurl, options) {
    this.pageManager.jump(viewurl, options);
  }

  /**
   * 关闭webview
   * @param       {Object} options
   */
  close(options) {
    this.pageManager.close(options);
  }

  /**
   * 获取view query信息
   * @return {Object}
   */
  getQuery() {
    return this.props.location.query;
  }

  /**
   * 获取view state信息
   * @return {Object}
   */
  getState() {
    return this.props.location.state;
  }

  /**
   * 页面返回回调函数，默认行为可被覆写
   */
  onBack() {
    console.log('use LuPage.onBack');
    this.back();
  }

}

/**
 * 静态context，用来与App建立关联
 * @type {Object}
 */
Page.contextTypes = {
  setTitle: React.PropTypes.func,
  showDialog: React.PropTypes.func,
  hideDialog: React.PropTypes.func,
};

export default Page;
