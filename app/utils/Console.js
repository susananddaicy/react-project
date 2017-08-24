/**
 * Console类，提供对console的封装，加入debug支持
 * @description Console的实例名称如果为console,需要保证初始化之前不能存在console(window)操作，否则babel后会报错，可参考Stack.js
 * @example
 * const console = new Console(false);//override window.console
 */
class Console {
  constructor(debug) {
    for (const key in console) {
      if (typeof console[key] === 'function') {
        this[key] = (function a(consoleKey) {
          return function b(...args) {
            if (Console.DEBUG && debug) {
              console[consoleKey].apply(console, args);
            }
          };
        }(key));
      }
    }
  }
}

Console.DEBUG = true;

export default Console;
