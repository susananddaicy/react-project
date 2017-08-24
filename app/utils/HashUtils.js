/**
 * 获取hash中url相关的参数类
 * @description /insurance#home?param1=1&param2=2
 */
class HashUtils {
  /**
   * 获取当前url中的hash部分
   * @param {String} url
   * @return      {String}
   * @example
   * home?param1=1&param2=2
   */
  static getHash(url) {
    let ret = '';
    if (url) {
      const iHash = url.indexOf('#');
      const hasHash = (iHash >= 0);
      if (hasHash) {
        ret = url.substring(iHash);
      }
    } else {
      ret = location.hash.substring(1);
    }
    return ret;
  }

  /**
   * 获取当前url中hash部分的query params
   * @param {String} url
   * @return      {String}
   * @example
   * param1=1&param2=2
   */
  static getHashParam(url) {
    const hash = HashUtils.getHash(url);
    return hash.substring(hash.indexOf('?') + 1);
  }

  /**
   * 获取当前url中hash部分的某一个key对应的value
   * @param       {String} key hash query中的某个key
   * @param       {String} url
   * @return      {String}
   * @example
   * param1:1
   */
  static getHashQuery(key, url) {
    const args = [];
    const query = HashUtils.getHashParam(url);
    const pairs = query.split('&');
    for (let i = 0; i < pairs.length; i++) {
      const pos = pairs[i].indexOf('=');
      if (pos === -1) continue;
      const argname = pairs[i].substring(0, pos);
      let value = pairs[i].substring(pos + 1);
      value = decodeURIComponent(value);
      args[argname] = value;
    }
    return args[key];
  }

  /**
   * 将key/value转换成query字符串形式
   * @param       {String} key   [description]
   * @param       {String} value [description]
   * @return      {String}       [description]
   * key=value
   */
  static toQueryPair(key, value) {
    if (typeof value === 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

  /**
   * 将一个obj转换成query字符串形式
   * @param       {Object} obj 目标对象
   * @return      {String}
   * @example
   * {param1:1,param2:2} -> param1=1&param2=2
   */
  static toQueryString(obj) {
    let ret = [];
    Object.keys(obj).forEach(key => {
      key = encodeURIComponent(key);
      const values = obj[key];
      if (values && values.constructor === Array) { // 数组
        const queryValues = [];
        let value;
        for (let i = 0, len = values.length; i < len; i++) {
          value = values[i];
          queryValues.push(HashUtils.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { // 字符串
        ret.push(HashUtils.toQueryPair(key, values));
      }
    });
    return ret.join('&');
  }

  /**
   * 在当前url的query部分加上query params
   * @param       {String} url
   * @param       {Object} obj
   * @example
   */
  static addQueryParam(url, obj) {
    let retUrl = url;
    const strQuery = HashUtils.toQueryString(obj);
    const hasHash = (url.indexOf('#') >= 0);
    if (hasHash) {
      // TODO
      const hash = HashUtils.getHash(url);
      const hasHashQuest = (hash.indexOf('?') >= 0);
      if (hasHashQuest) {
        retUrl = retUrl + '&' + strQuery;
      } else {
        retUrl = retUrl + '?' + strQuery;
      }
    } else {
      const hasQuest = (url.indexOf('?') >= 0);
      if (hasQuest) {
        retUrl = retUrl + '&' + strQuery;
      } else {
        retUrl = retUrl + '?' + strQuery;
      }
    }
    return retUrl;
  }
}

export default HashUtils;
