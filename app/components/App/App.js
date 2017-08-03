import React, { PropTypes, Component } from 'react';

class App extends Component {
	
  render() {
    return <section>{this.props.children}</section>
  }
}

export default App;
