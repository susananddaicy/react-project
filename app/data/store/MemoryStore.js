import AbstractStore from './AbstractStore';
import memoryStorage from './memoryStorage';

/**
 * MemoryStore
 */
class MemoryStore extends AbstractStore {
  constructor() {
    super({
      proxy: memoryStorage,
    });
  }

  /**
   * @description 获取MemoryStore单例对象
   * @return      {MemoryStore}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

export default MemoryStore;
