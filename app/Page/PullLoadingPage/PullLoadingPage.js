import React, {
  Component
} from 'react';
import './PullLoadingPage.css';
import PageList from '../../components/Page/PageList.js';

class PullLoadingPage extends PageList {
  constructor(props) {
    super(props);
    this.state = {};
    this.openPull('1');
  }

  onPullDown() {
    setTimeout(() => {
      this.endPull();
    },1000);
  }

  render() {
    return (
      <div className="PullLoadingPage-content">
          This is PullLoadingPage         
      </div>
    );
  }
}

export default PullLoadingPage;