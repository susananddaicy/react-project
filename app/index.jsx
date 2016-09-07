import '../node_modules/bootstrap/scss/bootstrap.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import vconsole from 'vconsole';

class App extends React.Component{
    constructor() {
        super();
    }
    render() {
        console.log("hello world");
        //JSX here!
        return (
          <div className="container">
            <section className="jumbotron">
              <h3 className="jumbotron-heading">Search Github Users</h3>
            </section>
          </div>
        )
    }
};
const app = document.createElement('div');
$('body').append(app);
ReactDOM.render(<App />, app);
