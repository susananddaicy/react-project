import './Home.css';
import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 1,
    };
  }

  componentDidMount() {
    this.setState({
      val: this.state.val + 1,
    });
    console.log(this.state.val);
    this.setState({
      val: this.state.val + 1,
    });
    console.log(this.state.val);  

    setTimeout(() => {
      this.setState({
        val: this.state.val + 1,
      });
      console.log(this.state.val);
      this.setState({
        val: this.state.val + 1,
      });
      console.log(this.state.val);

    },0); 
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-container">
        <p>React Components</p>
        <p className="desc">移动端组件库</p>     
        <ul>
          <li><Link to="actionSheet">ActionSheet(动作面板)</Link></li>
          <li><Link to="accordion">Accordion(手风琴)</Link></li>    
          <li><Link to="picker">Picker(选择器)</Link></li>
          <li><Link to="swiper">Swiper(轮播)</Link></li>   
          <li><Link to="timeLine">TimeLine(时间轴)</Link></li>         
          <li><Link to="panel">Panel(面板)</Link></li>                   
        </ul>
        </div>
       {/*  <p className="my"><Link to="my">我的简历</Link></p> */}
      </div>
    );
  }

}

export default Home;
