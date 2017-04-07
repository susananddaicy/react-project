import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './components/App';
import Home from './components/Home';

const run = function () {
  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
{/*        <Route path="actionSheet" component={ActionSheetDemo}/>*/}
      </Route>
    </Router>
  ), document.getElementById('app'));
}

run();
