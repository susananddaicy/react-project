import CommonUtils from '../../utils/CommonUtils';
import _ from 'lodash';

const host = window.location.host;
const hostObj = {};

/**
 * 根据localStorage接口模拟内存变量，隐私模式下将数据绑定到window.name
 */
const memoryStorage = {
  dataMap: {},

  /**
   * 根据key存储值
   * @param       {String} key 存储key值
   * @param       {String} val 存储value值
   */
  setItem: function(key, val) {
    this.dataMap[key] = val;
    this.reSetName();
  },

  /**
   * 根据key读取值
   * @param       {String} key 存储key值
   * @return      {String}     存储value值
   */
  getItem: function(key) {
    if (_.isEmpty(this.dataMap)) {
      try {
        const nameObj = JSON.parse(window.name)[host];
        if (_.isObject(nameObj)) {
          this.dataMap = nameObj;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return this.dataMap[key];
  },

  /**
   * 移除key存储的值
   * @author yanjj
   * @param       {String} key 存储key值
   */
  removeItem: function(key) {
    delete this.dataMap[key];
    this.reSetName();
  },

  /**
   * 清空存储值
   */
  clear: function() {
    this.dataMap = {};
    this.reSetName();
  },

  /**
   * 重设window.name
   * @description 私有方法
   */
  reSetName: function() {
    if (CommonUtils.isPrivateModel()) {
      hostObj[host] = this.dataMap;
      window.name = JSON.stringify(hostObj);
    }
  },
};

export default memoryStorage;
