import React from 'react';
import './PullLoading.css';

function Loading(props) {
  return (
    <div className={props.className} ref={props.getRef}>
      <div className="PullLoading">
        <span className="Loading-p1"></span>
        <span className="Loading-p2"></span>
        <span className="Loading-p3"></span>
      </div>
    </div>
  );
}

module.exports = Loading;
