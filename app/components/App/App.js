import React, { PropTypes, Component } from 'react';
import Dialog from '../Dialog/Dialog.js'


class App extends Component {
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
  componentDidMount() {
    document.body.style.backgroundColor = '#EDF2F6';
  }
  
  showDialog(state) {
    this.setState({
      dialogProps: state,
    });
  }

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

export default App;
