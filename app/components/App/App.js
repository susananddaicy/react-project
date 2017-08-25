import React, { PropTypes, Component } from 'react';
import Dialog from '../Dialog/Dialog.js'
import Navbar from '../Navbar/Navbar.js';
import PullLoading from '../PullLoading/PullLoading.js';


class App extends Component {

  /**
   * 通过在App（context提供者）中添加childContextTypes和getChildContext，
   * React会向下自动传递参数，任何组件只要在它的子组件中，就能通过定义contextTypes来获取参数。
   * @description private
   */
  getChildContext() {
    return {
      setTitle: this.setTitle,
      showDialog: this.showDialog,
      hideDialog: this.hideDialog,
      getAppView: this.getAppView,
      getPageView: this.getPageView,
      getTopLoadingView: this.getTopLoadingView,
      getBottomLoadingView: this.getBottomLoadingView,      
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      dialogProps: null,
      navBarProps: null,
    };
    const arrHandler = [
      'setTitle',
      'showDialog',
      'hideDialog',
    ];
    arrHandler.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });

    // 容器DOM
    this.domAppView = null;
    this.domPageView = null;

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

  setTitle(state) {
    this.setState({
      navBarProps: state,
    });
  }

  getAppView() {
    return this.domAppView || document.querySelectorAll('.App')[0];
  }

  getPageView() {
    return this.domPageView || document.querySelectorAll('.Page')[0];
  }

  getTopLoadingView() {
    return this.domTopLoadingView || document.querySelectorAll('.TopLoading')[0];
  }

  getBottomLoadingView() {
    return this.domBottomLoadingView || document.querySelectorAll('.BottomLoading')[0];
  }

  render() {
    const AppStyle = { position: 'relative', minHeight: '100%', paddingTop: !this.state.navBarProps ? '0rem' : '4.4rem' };
    
    let NavBar = null;
    if (this.state.navBarProps) {
      NavBar = <Navbar {...this.state.navBarProps} />;
    }
    return (
      <div style={AppStyle}>
        {NavBar}
        <PullLoading className="TopLoading" getRef={(c) => { this.domTopLoadingView = c; }} />
        <section>{this.props.children}</section>  
        <PullLoading className="BottomLoading" getRef={(c) => { this.domBottomLoadingView = c; }} />
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
  setTitle: PropTypes.func,
  showDialog: PropTypes.func,
  hideDialog: PropTypes.func,
  getAppView: PropTypes.func,
  getPageView: PropTypes.func,
  getTopLoadingView: PropTypes.func,
  getBottomLoadingView: PropTypes.func,
};

export default App;
