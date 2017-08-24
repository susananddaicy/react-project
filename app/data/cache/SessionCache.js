import AbstractCache from './AbstractCache';
import SessionStore from '../store/SessionStore';
import MemoryStore from '../store/MemoryStore';
import CommonUtils from '../../utils/CommonUtils';

/**
 * SessionCache
 * @example
 *  class DemoCache extends SessionCache {
 *    constructor() {
 *      const options = {
 *        lifeTime = '2D',          //超时时间两天
 *        defaultData : {
 *          name : ''
 *        },
 *        key : 'demo_key'
 *      }
 *      super(options);
 *    }
 *  }
 */
class SessionCache extends AbstractCache {
  constructor(options) {
    /**
     * 本地存储对象, 如果是隐私模式，就存入内存中，否则存入sessionStorage中
     */
    const opts = options;
    opts.proxy = CommonUtils.isPrivateModel() ? MemoryStore.getInstance() : SessionStore.getInstance();
    super(opts);
  }

  /**
   * @description 获取SessionCache单例对象
   * @return      {SessionCache}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

export default SessionCache;
