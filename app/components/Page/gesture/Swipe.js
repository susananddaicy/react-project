import _ from 'lodash';

/**
 * 滑动手势库
 * @example
 * Swipe.on(elem, 'down', (direction, distance)=>{}, true, 0, 5, 0);
 */
class Swipe {
  constructor(props) {
    // swipe监听目标元素
    this.elem = null;
    // touch点击位置信息
    this.touch = {};

    this.options = {
      sensibility: 0,
      step: 20, // 偏移步长
      throttleTime: 0,
    };

    // swipe回调事件
    this.events = {};
    // swipe事件兼容
    this.eventNames = {
      down: 'touchstart',
      move: 'touchmove',
      up: 'touchend',
    };
    if (!('ontouchstart' in window)) {
      this.eventNames = {
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup',
      };
    }
    console.log(this.eventNames);
  }

  /**
   * 获取手指滑动时方向和距离
   * @description 私有方法
   * @param       {Int} x1 起始点x
   * @param       {Int} x2 结束点x
   * @param       {Int} y1 起始点y
   * @param       {Int} y2 结束点y
   * @param       {Int} sensibility 灵敏度
   * @return      {Object} 移动方向与距离
   */
  getSwipeParams(x1, x2, y1, y2, sensibility) {
    const xOffset = Math.abs(x1 - x2);
    const yOffset = Math.abs(y1 - y2);
    let dir = (xOffset >= yOffset) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');
    let dist = (xOffset >= yOffset) ? xOffset : yOffset;

    if (sensibility) {
      if (dir === 'left' || dir === 'right') {
        if ((yOffset / xOffset) > sensibility) {
          dir = '';
        }
        dist = xOffset * sensibility;
      } else if (dir === 'up' || dir === 'down') {
        if ((xOffset / yOffset) > sensibility) {
          dir = '';
        }
        dist = yOffset * sensibility;
      }
    }
    return {
      direction: dir,
      distance: dist,
    };
  }

  /**
   * 绑定手势滑动目标元素，并设置监听
   * @param {object} elem DOM对象
   * @param {string} dir 方向, left, right, up, down
   * @param {function} callback 回调函数
   * @param {function|boolean} preventDefault 是否阻止事件冒泡
   * @param {number} sensibility 设置灵敏度，值为0-1
   * @param {number} step 设置步长
   * @param {number} throttleTime 节流时间
   */
  on(elem, dir, callback, preventDefault, sensibility, step, throttleTime) {
    if (!elem) {
      return;
    }
    this.elem = elem;
    sensibility = sensibility || this.options.sensibility;
    step = step || this.options.step;
    throttleTime = throttleTime || this.options.throttleTime;

    let direction = '';
    let distance = 0;

    this.events['swipe_' + this.eventNames[dir]] = callback;

    if (this.bindedEvent) {
      return;
    }
    this.bindedEvent = true;

    this.elem.addEventListener(this.eventNames.down, _.throttle((e) => {
      const pos = (e.touches && e.touches[0]) || e;
      const touch = this.touch;
      touch.x1 = pos.pageX;
      touch.y1 = pos.pageY;
      console.log('touch down:', this.touch);
    }, throttleTime));
    this.elem.addEventListener(this.eventNames.move, _.throttle((e) => {
      if (typeof this.touch.x1 === 'undefined' || typeof this.touch.y1 === 'undefined') return;

      const pos = (e.touches && e.touches[0]) || e;
      const touch = this.touch;
      touch.x2 = pos.pageX;
      touch.y2 = pos.pageY;
      console.log('touch move:', this.touch);

      if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > step) ||
        (touch.y2 && Math.abs(touch.y1 - touch.y2) > step)) {
        const params = this.getSwipeParams(touch.x1, touch.x2, touch.y1, touch.y2, sensibility);
        direction = params.direction;
        distance = params.distance;
      }
      const preventDefultFlag = _.isFunction(preventDefault) ? preventDefault(direction, distance) : preventDefault;
      console.log('preventDefultFlag', preventDefultFlag);
      if (preventDefultFlag) {
        // 阻止鼠标移动时view跟随鼠标滚动的默认行为
        e.preventDefault();
      }
    }, throttleTime));
    this.elem.addEventListener(this.eventNames.up, _.throttle((e) => {
      const pos = (e.changedTouches && e.changedTouches[0]) || e;
      const touch = this.touch;
      touch.x2 = pos.pageX;
      touch.y2 = pos.pageY;
      console.log('touch up:', this.touch);

      if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > step) ||
        (touch.y2 && Math.abs(touch.y1 - touch.y2) > step)) {
        const params = this.getSwipeParams(touch.x1, touch.x2, touch.y1, touch.y2, sensibility);
        direction = params.direction;
        distance = params.distance;

        if (_.isFunction(this.events['swipe_' + this.eventNames[direction]])) {
          console.log(direction, 'execute callback...');
          this.events['swipe_' + this.eventNames[direction]](direction, distance);
        }
      } else {
        if (_.isFunction(this.events['swipe_tap'])) {
          this.events['swipe_tap']();
        }
      }
      this.touch = {};
    }, throttleTime));
  }

  /**
   * 注销手指滑动
   */
  off() {
    _.forEach(this.eventNames, event => {
      console.log(event);
      this.elem.removeEventListener(event, this.events['swipe_' + event]);
    });

    if (this.bindedEvent) {
      delete this.bindedEvent;
    }

    ['left', 'right', 'up', 'down'].forEach(event => {
      if (this.events['swipe_' + this.eventNames[event]]) {
        delete this.events['swipe_' + this.eventNames[event]];
      }
    });
  }

}

export default new Swipe;
