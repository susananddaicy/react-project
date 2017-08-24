import AbstractStore from './AbstractStore';

/**
 * LocalStore
 * @example
 * const localStore = LocalStore.getInstance();
 * localStore.set('key1','value1','1464699235344','1464699235344');
 * const value1 = localStore.get('key1');
 * console.log(value1,'......')
 */
class LocalStore extends AbstractStore {
  constructor() {
    super({
      proxy: window.localStorage,
    });
  }

  /**
   * @description 获取LocalStore单例对象
   * @return      {LocalStore}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

export default LocalStore;
