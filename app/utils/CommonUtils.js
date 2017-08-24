class CommonUtils {
  /**
   * 判断是否是隐私模式
   * @return {Boolean}
   */
  static isPrivateModel() {
    const testKey = 'TEST_PRIVATE_MODEL';
    const storage = window.localStorage;

    try {
      storage.setItem(testKey, 1);
      storage.removeItem(testKey);
    } catch (e) {
      console.log('Error [CommonUtils].[isPrivateModel]:', e);
      return true;
    }
    return false;
  }
}

export default CommonUtils;
