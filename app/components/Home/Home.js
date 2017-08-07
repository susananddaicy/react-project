import './Home.css';
import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="Home">
        <div className="Home-container">
        <h1>React Components</h1>
        <ul>
          <li><Link to="actionSheet">ActionSheet(动作面板)</Link></li>
          <li><Link to="accordion">Accordion(手风琴)</Link></li>    
          <li><Link to="picker">Picker(选择器)</Link></li>             
        </ul>
        </div>
      </div>
    );
  }

}

export default Home;
