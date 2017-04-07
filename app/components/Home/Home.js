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
        <ul>
          <li><Link to="actionSheet">ActionSheet</Link></li>
        </ul>
        </div>
      </div>
    );
  }

}

export default Home;
