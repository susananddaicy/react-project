import React, {Component} from 'react';
import App from '../App/App.js';


class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const arrHandler = [
      'showDialog',
      'hideDialog',
    ];
    arrHandler.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }


  showDialog(dialog) {
    if (dialog.buttons) {
      dialog.buttons.forEach((item) => {
        if (!item.onClick) {
          item.onClick = this.hideDialog;
        }
      });
    } else {
      dialog.buttons = [{
        label: '确定',
        onClick: this.hideDialog,
      }];
    }

    this.context.showDialog(dialog);
  }

  /**
   * 调用隐藏dialog
   * @description 禁止在render中使用
   */
  hideDialog() {
    this.context.hideDialog();
  }

}
/**
 * 静态context，用来与App建立关联
 * @type {Object}
 */
Page.contextTypes = {
  showDialog: React.PropTypes.func,
  hideDialog: React.PropTypes.func,
};

export default Page;