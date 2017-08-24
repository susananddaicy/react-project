
const STRING = {
  EMPTY_STACK: 'Empty stack.',
};

class StackException {
  constructor(message) {
    this.name = 'StackException';
    this.message = message;
  }
  toString() {
    return `${this.name}:${this.message}`;
  }
}

/**
 * javascript实现的stack类，用于pagemanager做页面管理
 */
class Stack {
  constructor() {
    this.stack = [];
  }

  /**
   * 是否为空
   * @return      {Boolean}
   */
  isEmpty() {
    return !this.stack.length;
  }

  /**
   * 向栈中压入新元素
   * @param       {Object} elem
   */
  push(elem) {
    this.stack.push(elem);
  }

  /**
   * 弹出栈顶元素
   * @return      {Object}
   */
  pop() {
    if (this.isEmpty()) {
      throw new StackException(STRING.EMPTY_STACK);
    } else {
      const x = this.stack.pop();
      return x;
    }
  }

  /**
   * 取栈顶元素
   * @return      {Object} [description]
   */
  top() {
    if (this.isEmpty()) {
      throw new StackException(STRING.EMPTY_STACK);
    } else {
      const x = this.stack[this.length() - 1];
      return x;
    }
  }

  /**
   * 清空栈
   */
  clear() {
    this.stack = [];
  }

  /**
   * 获取栈长度
   */
  length() {
    return this.stack.length;
  }

  /**
   * 打印栈内容
   */
  print() {
    console.warn(this.stack);
  }

  /**
   * 序列化栈内容
   */
  serialize() {
    return JSON.stringify(this.stack);
  }

  /**
   * 反序列化栈内容
   */
  deserialize(val) {
    this.stack = JSON.parse(val);
    return this;
  }

}

export default Stack;
