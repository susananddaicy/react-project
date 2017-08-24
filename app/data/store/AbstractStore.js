import Console from '../../utils/Console';
const console = new Console(false);

/**
 * AbstractStore
 * @description Store抽象处理类，不可直接使用
 */
class AbstractStore {
  /**
   * AbstractStore构造函数
   * @param {Object} options 用法见LocalStore/SessionStore/MemoryStore
   */
  constructor(options) {
    // storage代理引用，在子类中设置
    this.proxy = null;
    // storage有效存储key，用来管理有效store
    this.storedKeys = 'STORAGE_KEYS';
    console.log('>>---', options);
    Object.keys(options).forEach(opt => {
      this[opt] = options[opt];
    });
  }

  /**
   * 删除过期缓存
   */
  removeOverdueStorage() {
    // 比较缓存中的过期时间是否超过了最新时间
    const dateNow = Date.now();
    const strStoredKeys = this.proxy.getItem(this.storedKeys);
    const objsNewStoredKeys = [];
    let objsStoredKeys = [];
    if (!strStoredKeys) {
      return;
    }
    objsStoredKeys = JSON.parse(strStoredKeys);
    for (let i = 0, tempObj; i < objsStoredKeys.length; i++) {
      tempObj = objsStoredKeys[i];
      if (new Date(tempObj.expiretime).getTime() <= dateNow) {
        // 过期的删除
        this.proxy.removeItem(tempObj.key);
      } else {
        // 未过期添加到新的数组中
        objsNewStoredKeys.push(tempObj);
      }
    }
    // 最后将新数组放到缓存中
    this.proxy.setItem(this.storedKeys, JSON.stringify(objsNewStoredKeys));
  }

  /**
   * 删除离过期时间最近的缓存
   * @description 私有方法，用private打头，后期改用decorator
   * @param {String| Int}num
   */
  privateRemoveOverdueStoreLately(num) {
    const myNum = num || 5;
    const strStoredKeys = this.proxy.getItem(this.storedKeys);
    let objsStoredKeys = [];
    if (strStoredKeys) {
      objsStoredKeys = JSON.parse(strStoredKeys);
      // 排序比较耗时
      objsStoredKeys.sort((a, b) => {
        const timeA = new Date(a.expiretime).getTime();
        const timeB = new Date(b.expiretime).getTime();
        return timeA - timeB;
      });
      // 删除N个 缓存
      const delStore = objsStoredKeys.splice(0, myNum) || [];
      for (let i = 0; i < delStore.length; i++) {
        this.proxy.removeItem(delStore[i].key);
      }
      // 将剩余的key存入缓存中
      this.proxy.removeItem(this.storedKeys);
      if (objsStoredKeys.length > 0) {
        this.proxy.setItem(this.storedKeys, JSON.stringify(objsStoredKeys));
      }
    }
  }

  /**
   * 将缓存的key和过期时间放到缓存中
   * @description 私有方法
   * @param {String} key 存储key值
   * @param {String} expiretime 过期时间
   */
  privateSetStoredKeys(key, expiretime) {
    if (!key || !expiretime || new Date(expiretime) < new Date()) {
      return;
    }
    const storeKeyObj = {};
    const strStoredKeys = this.proxy.getItem(this.storedKeys);
    let isStoredKeyExist = false;
    let objsStoredKeys = [];
    storeKeyObj.key = key;
    storeKeyObj.expiretime = expiretime;
    if (strStoredKeys) {
      objsStoredKeys = JSON.parse(strStoredKeys);
    }
    for (let i = 0, tempObj; i < objsStoredKeys.length; i++) {
      tempObj = objsStoredKeys[i];
      if (tempObj.key === key) {
        // 更新最新的过期时间
        objsStoredKeys[i] = storeKeyObj;
        isStoredKeyExist = true;
      }
    }
    if (!isStoredKeyExist) {
      // 添加新的过期时间对象
      objsStoredKeys.push(storeKeyObj);
    }
    // 最后将新数组放到缓存中
    this.proxy.setItem(this.storedKeys, JSON.stringify(objsStoredKeys));
  }

  /**
   * 构建storage存储对象
   * @description 私有方法
   * @param {Object} value
   * @param {String} expiretime
   * @param {String} savetime
   * @return {object}
   */
  privateBuildStorageEntity(value, expiretime, savetime) {
    const entity = {
      value: value,
      expiretime: expiretime,
      savetime: savetime,
    };
    return entity;
  }

  /**
   * 向Store中存放数据
   * @param {String} key 数据Key值
   * @param {Object} value 数据对象
   * @param {Date} expiretime 可选,数据失效时间,如不传,默认过期时间为当前日期过会30天
   * @param {Date} savetime 可选,数据保存时间
   * @return {Boolean} 成功true,失败false
   */
  set(key, value, expiretime, savetime) {
    const mySavetime = savetime || Date.now();
    const myExpiretime = expiretime || (mySavetime + 30 * 24 * 60 * 60 * 1000);
    // 将key和过期时间放到缓存中
    this.privateSetStoredKeys(key, myExpiretime);
    const entity = this.privateBuildStorageEntity(value, myExpiretime, mySavetime);
    try {
      this.proxy.setItem(key, JSON.stringify(entity));
      return true;
    } catch (e) {
      // localstorage写满时,全清掉
      if (e.name === 'QuotaExceededError') {
        // this.proxy.clear();
        this.privateRemoveOverdueStoreLately();
        this.set(key, value, myExpiretime, mySavetime);
      }
    }
    return false;
  }

  /**
   * 根据key获取value值,如指定的key未定义返回null
   * @param {String} key 数据Key会值
   * @return {Object} 取回保存的数据
   */
  get(key) {
    let result;
    let value = null;
    try {
      result = this.proxy.getItem(key);
      if (result) {
        result = JSON.parse(result);
        if (result.expiretime >= Date.now()) {
          value = result.value;
        }
      }
    } catch (e) {
      if (console) {
        console.log(e);
      }
    }
    return value;
  }

  /**
   * 获得某个storage的保存时间
   * @param {String} key 数据key
   * @returns {Date} 返回Store保存时间
   */
  getSaveTime(key) {
    let result;
    let value = null;
    try {
      result = this.proxy.getItem(key);
      if (result) {
        result = JSON.parse(result);
        if (result.savetime) {
          value = new Date(result.savetime);
        }
      }
    } catch (e) {
      if (console) {
        console.log(e);
      }
    }
    return value;
  }

  /**
   * 返回指定key的超时时间
   * @param {String} key storage key值
   * @return {Number} expiretime 超时时间,距离1970年的毫秒数
   */
  getExpireTime(key) {
    let result = null;
    let time = null;
    try {
      result = this.proxy.getItem(key);
      if (result) {
        result = JSON.parse(result);
        time = new Date(result.expiretime);
      }
    } catch (e) {
      if (console) {
        console.log(e);
      }
    }
    return time;
  }

  /**
   * 清除指定key
   * @param {String} key 数据key值
   */
  remove(key) {
    return this.proxy.removeItem(key);
  }

  /**
   * 返回storage存储的所有数据
   * @return {Array} result,形式如[{key:'aa',value:{}}]
   */
  getAll() {
    const len = this.proxy.length;
    const vals = [];
    for (let i = 0; i < len; i++) {
      const key = this.proxy.key(i);
      const obj = {
        key: key,
        value: this.get(key),
      };
      vals.push(obj);
    }
    return vals;
  }

  /**
   * 清空所有storage内容
   */
  clear() {
    this.proxy.clear();
  }

  /**
   * 垃圾收集,清掉失效的数据
   * @description 内部使用
   */
  gc() {
    const storage = this.proxy;
    const len = this.proxy.length;
    for (let i = 0; i < len; i++) {
      const name = storage.key(i);
      try {
        if (!this.get(name)) {
          this.remove(name);
        }
      } catch (e) {
        if (console) {
          console.log(e);
        }
      }
    }
  }
}

export default AbstractStore;
