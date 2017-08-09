import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './components/App';
import './public/style';
import Home from './components/Home';
import ActionSheet from './Page/ActionSheetPage';
import Accordion from './Page/AccordionPage/AccordionPage';
import Picker from './Page/PickerPage/PickerPage';
import Swiper from './Page/Slider/Slider';
import FastClick from 'fastclick';

FastClick.attach(document.body);

const run = function () {
  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="actionSheet" component={ActionSheet}/>
        <Route path="accordion" component={Accordion}/>   
        <Route path="picker" component={Picker}/>  
        <Route path="swiper" component={Swiper}/>         
             
      </Route>
    </Router>
  ), document.getElementById('app'));
}

run();
