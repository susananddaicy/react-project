import ObjectUtil from '../../utils/ObjectUtils';
import Console from '../../utils/Console';
import _ from 'lodash';
const console = new Console(false);

/**
 * AbstractCache
 * @description: Cache抽象处理类，不可直接使
 */
class AbstractCache {
  /**
   * AbstractCache构造函数
   * @param {Object} options
   */
  constructor(options) {
    /**
     * 当前Store键值
     * @override
     * @type {String}
     */
    this.key = null;

    /**
     * 数据存活时间, 参数传递格式为“时间+时间单位',如30M
     * 时间单位有D:day,H:hour,M:minutes,S:secend,
     * 如果不传递时间单位,默认时间单位为M
     * @type {String}
     * @default 30M
     */
    this.lifeTime = '30M';

    /**
     * 默认数据
     * @type {object}
     */
    this.defaultData = null;

    /**
     * 本地存储对象
     * @type {object}
     * @override
     */
    this.proxy = null;

    Object.keys(options).forEach(opt => {
      this[opt] = options[opt];
    });
  }

  /**
   * 向Store中添加数据
   * @param {Object} value 要添加的数据
   */
  set(value) {
    const oldExprieTime = this.getExpireTime();
    let time = Date.now();
    time = time + this.getLifeTime();
    if (time < oldExprieTime) {
      time = oldExprieTime;
    }
    this.proxy.set(this.key, value, time, null);
  }

  /**
   * 设置属性值
   * @param {String} attrName  支持通过路径的方式，如 setAttr('global.user.name','张三')
   * @param {Object} attrVal 属性值
   */
  setAttr(attrName, attrVal) {
    let flag = false;
    if (_.isObject(attrName)) {
      for (const i of attrName) {
        if (attrName.hasOwnProperty(i)) {
          this.setAttr(i, attrName[i], attrVal);
        }
      }
      return flag;
    }
    const obj = this.get() || {};
    if (obj) {
      ObjectUtil.set(obj, attrName, attrVal);
      flag = this.set(obj);
    }
    return flag;
  }

  /**
   * 设置当前对象的过期时间
   * @param {String} lifeTime 字符串
   */
  setLifeTime(lifeTime) {
    this.lifeTime = lifeTime;
    const value = this.get();
    const savetime = this.proxy.getSaveTime(this.key) || Date.now();
    const expiretime = savetime + this.getLifeTime();
    this.proxy.set(this.key, value, expiretime, savetime);
  }


  /**
   * 获取已存取数据
   * @return {Object} result Store中存储的数据
   */
  get() {
    let result = null;
    let isEmpty = true;
    if (Object.prototype.toString.call(this.defaultData) === '[object Array]') {
      result = this.defaultData.slice(0);
    } else if (this.defaultData) {
      result = _.extend({}, this.defaultData);
    }
    const obj = this.proxy.get(this.key);
    const type = typeof obj;
    const typeMap = {
      'string': true,
      'number': true,
      'boolean': true,
    };
    if (typeMap[type]) {
      return obj;
    }
    if (obj) {
      if (Object.prototype.toString.call(obj) === '[object Array]') {
        result = [];
        for (let i = 0, ln = obj.length; i < ln; i++) {
          result[i] = obj[i];
        }
      } else {
        if (obj && !result) {
          result = {};
        }
        _.extend(result, obj);
      }
    }
    if (result != null && Object.keys(result).length !== 0) {
      isEmpty = false;
    }
    return !isEmpty ? result : null;
  }

  /**
   * 获取已存取对象的属性
   * @param {String} attrName 支持通过路径的方式，如 getAttr('global.user.name')
   * @returns {Object} value 数据的属性值
   */
  getAttr(attrName) {
    const obj = this.get();
    let attrVal = null;
    if (obj) {
      attrVal = ObjectUtil.get(obj, attrName);
    }
    return attrVal;
  }

  /**
   * 移除数据存储
   */
  remove() {
    this.proxy.remove(this.key);
  }

  /**
   * 移除存储对象的指定属性
   * @param {String} attrName
   */
  removeAttr(attrName) {
    const obj = this.get() || {};
    if (obj[attrName]) {
      delete obj[attrName];
    }
    this.set(obj);
  }

  /**
   * 返回失效时间
   * @returns {object} exprieTime 过期时间
   */
  getExpireTime() {
    let result = null;
    try {
      result = this.proxy.getExpireTime(this.key);
    } catch (e) {
      if (console) {
        console.log(e);
      }
    }
    return result;
  }

  /**
   * 设置过期时间
   * @param {Date} time 过期时间
   */
  setExpireTime(time) {
    const value = this.get();
    this.proxy.set(this.key, value, time);
  }

  /*
   * 根据liftTime 计算要增加的毫秒数
   * @returns {number} 根据liftTime 计算要增加的毫秒数
   * @private
   */
  getLifeTime() {
    const str = this.lifeTime + '';
    const num = +str.substring(0, str.length - 1);
    let timeout = 0;
    let unit = str.charAt(str.length - 1);
    if (typeof unit === 'number') {
      unit = 'M';
    } else {
      unit = unit.toUpperCase();
    }

    if (unit === 'D') {
      timeout = num * 24 * 60 * 60;
    } else if (unit === 'H') {
      timeout = num * 60 * 60;
    } else if (unit === 'M') {
      timeout = num * 60;
    } else if (unit === 'S') {
      timeout = num;
    } else {
      // 默认为秒
      timeout = num * 60;
    }
    return timeout * 1000;
  }

}

export default AbstractCache;
