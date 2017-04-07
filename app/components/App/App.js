import React, { PropTypes, Component } from 'react';

class App extends Component {

  componentWillUpdate() {
    //为了区别不同页面的背景色，除了缺省页特例是白色背景，其他页面都是灰色
    //因为是单页面，所以每个页面对body的改动会影响其他，因此在每次加载新页面时重新设置
    // document.body.style.backgroundColor = '#EDF2F6';
  }

  render() {
    return <section>{this.props.children}</section>
  }
}

export default App;
