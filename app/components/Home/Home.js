import './Home.css';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Page from '../Page/Page.js';

class Home extends Page {
  constructor(props) {
    super(props);
    this.state = {
      val: 1,
    };    
  }

  componentWillMount() {
    this.setTitle({
      naviBar: {
        title: 'Home',
      },
    });

    // 在JavaScript中，回调函数具体的定义为：函数A作为参数(函数引用)传递到另一个函数B中，
    // 并且这个函数B执行函数A。我们就说函数A叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数。因此callback 不一定用于异步，一般同步(阻塞)的场景下也经常用到回调，比如要求执行某些操作后执行回调函数。
    //一个同步(阻塞)中使用回调的例子，目的是在func1代码执行完成后执行func2。
    var func1=function(callback){
      console.log('执行func1');
      (callback && typeof(callback) === "function") && callback();
    }
    var func2=function(){
      console.log('执行func2');
    }
    func1(func2);


    // Promise 是异步编程的一种解决方案
    let p1 = new Promise((resolve, reject) => {
      console.log('这是我的异步代码，我执行了，但是不必等我，我是异步的');
      // 异步成功，执行resolve()
      resolve("succcess");
      // 异步失败，执行reject()
      // reject();
    });

    p1.then((param) => {
      // 异步成功的回调
      console.log(param);
    }, ()=> {
      // 异步失败的回调
      console.log('fail');
    })
      
  }



  componentDidMount() {
    // isBatchingUpdates为true,2次setState没有生效，放在了dirtyComponents
    this.setState({
      val: this.state.val + 1,
    });
    console.log(this.state.val);
    this.setState({
      val: this.state.val + 1,
    });
    console.log(this.state.val);  

    // 执行上下文改变，没有前置的batchedUpdate调用，isBatchingUpdates为false，导致新的state立马生效
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

/*     this.setState({
      val: this.state.val + 1,
    }, ()=> {
      console.log(this.state.val); // 2
    }); */

// 关于setTimeout，执行时间有个概念叫最小时间粒度，每次间隔也不可能是0（即使你设置为0），
// 浏览器会自动配置一个最小间隔时间，这个时间就叫最小时间粒度，不同浏览器这个时间大小也不同。
//
//
// http://www.ruanyifeng.com/blog/2014/10/event-loop.html
// http://javascript.ruanyifeng.com/advanced/timer.html


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
          <li><Link to="swiperOut">SwiperAction(左滑删除)</Link></li>    
          <li><Link to="pullLoading">PullLoading(下拉刷新)</Link></li>  
          <li><Link to="noticeBar">NoticeBar(通告栏)</Link></li> 
        </ul>
        </div>
        <p className="my"><Link to="my">我的简历</Link></p> 
      </div>
    );
  }

}

export default Home;
