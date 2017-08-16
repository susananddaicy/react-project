import React, { PropTypes, Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <section>{this.props.children}</section>  
      </div>
    )
  }
}

export default App;
