import AbstractCache from './AbstractCache';
import MemoryStore from '../store/MemoryStore';

/**
 * MemoryCache
 * @example
 *  class DemoCache extends MemoryCache {
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
 *
 */
class MemoryCache extends AbstractCache {
  constructor(options) {
    const opts = options;
    opts.proxy = MemoryStore.getInstance();
    super(opts);
  }

  /**
   * @description 获取MemoryCache单例对象
   * @return      {MemoryCache}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

export default MemoryCache;
