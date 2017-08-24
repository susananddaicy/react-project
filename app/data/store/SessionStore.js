import AbstractStore from './AbstractStore';

/**
 * SessionStore
 */
class SessionStore extends AbstractStore {
  constructor() {
    super({
      proxy: window.sessionStorage,
    });
  }

  /**
   * @description 获取SessionStore单例对象
   * @return      {SessionStore}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

export default SessionStore;
