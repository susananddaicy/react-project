import React, { PropTypes, Component } from 'react';
import Dialog from '../Dialog/Dialog.js'

class App extends Component {

  /**
   * 通过在App（context提供者）中添加childContextTypes和getChildContext，
   * React会向下自动传递参数，任何组件只要在它的子组件中，就能通过定义contextTypes来获取参数。
   * @description private
   */
  getChildContext() {
    return {
      showDialog: this.showDialog,
      hideDialog: this.hideDialog,
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      dialogProps: false,
    };
    const arrHandler = [
      'showDialog',
      'hideDialog',
    ];
    arrHandler.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }



  /**
   * 调用显示dialog
   * @param       {Object} state
   */
  showDialog(state) {
    this.setState({
      dialogProps: state,
    });
  }

  /**
   * 调用隐藏dialog
   */
  hideDialog() {
    this.setState({
      dialogProps: null,
    });
  }




  render() {
    return (
      <div>
        <section>{this.props.children}</section>  
        {this.state.dialogProps ? <Dialog options={this.state.dialogProps} /> : null}
      </div>
    )
  }
}

/**
 * 通过在App（context提供者）中添加childContextTypes和getChildContext，
 * React会向下自动传递参数，任何组件只要在它的子组件中，就能通过定义contextTypes来获取参数。
 * @type {Object}
 */
App.childContextTypes = {
  showDialog: PropTypes.func,
  hideDialog: PropTypes.func,
};

export default App;
