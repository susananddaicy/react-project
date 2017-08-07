import React, { PropTypes, Component } from 'react';

class App extends Component {

  componentDidMount() {
    document.body.style.backgroundColor = '#EDF2F6';
  }
  
  render() {
    return <section>{this.props.children}</section>
  }
}

export default App;
