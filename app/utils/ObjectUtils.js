class ObjectUtils {

  /**
   * 设置对象某个路径上的值
   * @param {object} obj
   * @param {string} string
   * @param {object|array|int} value
   * @returns {object}
   */
  static set(obj, path, value) {
    if (!path) {
      return null;
    }

    const array = path.split('.');

    obj = obj || {};

    for (let i = 0, len = array.length, last = Math.max(len - 1, 0); i < len; i++) {
      if (i < last) {
        obj = (obj[array[i]] = obj[array[i]] || {});
      } else {
        obj[array[i]] = value;
      }
    }

    return obj;
  }

  /**
   * 获得对象在某个路径上的值
   * @param {object} obj
   * @param {string} path
   * @returns {object}
   */
  static get(obj, path) {
    if (!obj || !path) {
      return null;
    }

    const array = path.split('.');

    obj = obj || {};

    for (let i = 0, len = array.length; i < len; i++) {
      obj = obj[array[i]];

      if (obj === null || typeof obj === 'undefined') {
        return null;
      }
    }

    return obj;
  }

}
export default ObjectUtils;
