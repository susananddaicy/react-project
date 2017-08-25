import React, { Component } from 'react';
import './SwiperOut.css';
import classNames from 'classnames';


class SwiperOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const arrHandler = [
      'onTouchStart',
      'onTouchEnd',
      'renderButtons',
    ];
    arrHandler.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.onTouchStart);
    document.addEventListener('touchend', this.onTouchEnd);
    
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
  }


  onTouchStart(event) {
      let initX; // 触摸位置
      let moveX; // 滑动时的位置
      let X = 0; // 移动距离
      let objX = 0; //目标对象位置
      //event.preventDefault();
      const obj = event.target.parentNode;
      if (obj.className == "SwiperOut__Item") {
        initX = event.targetTouches[0].pageX;
        objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        // 在初始位置
        if (objX === 0) {
          document.addEventListener('touchmove', function(event) {
           // event.preventDefault();
            const obj = event.target.parentNode;
            if (obj.className == "SwiperOut__Item") {
              moveX = event.targetTouches[0].pageX; 
              X = moveX - initX;
              if ( X >= 0) { // 向右滑动
                obj.style.transform = "translateX(" + 0 + "px)";
              } else if ( X < 0) { // 向左滑动
                let l = Math.abs(X);
                obj.style.transform = "translateX(" + -l + "px)";
                if (l > 80) {
                  l = 80;
                  obj.style.transform = "translateX(" + -l + "px)";
                }
              }
            }
          });
        } else if (objX < 0) { // 滑动至左边       
          document.addEventListener('touchmove', function(event) {
           // event.preventDefault();
            const obj = event.target.parentNode;
            if (obj.className == "SwiperOut__Item") {
              moveX = event.targetTouches[0].pageX;
              X = moveX - initX;
              if (X >= 0) { // 向右滑动
                let r = -80 + Math.abs(X);
                obj.style.transform = "translateX(" + r + "px)";
                if (r > 0) {
                  r = 0;
                  obj.style.transform = "translateX(" + r + "px)";
                }
              } else { //向左滑动
                obj.style.transform = "translateX(" + -80 + "px)";
              }
            }
          });
        }
      }
  }


  onTouchEnd(event) {
    let objX = 0; 
    //event.preventDefault();
    let obj = event.target.parentNode;
    if (obj.className == "SwiperOut__Item") {
      objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
      if (objX > -40) {
        obj.style.transform = "translateX(" + 0 + "px)";
        objX = 0;
      } else {
        obj.style.transform = "translateX(" + -80 + "px)";
        objX = -80;
      }
    }
  }

  renderButtons() {
    const buttonData = this.props.right;
    let buttonDom = buttonData.map((item, index) => 
      <div key={index} 
          className={classNames('flex-full', item.className)} 
          style={item.style}
          onClick={item.onPress}
      >
        {item.text}
      </div>
    );
    buttonDom = <div className="flex-hrz SwiperOut__btn">{buttonDom}</div>
    return buttonDom;
  }



  render() {
    return (
        <div className="SwiperOut">
          <div className="SwiperOut__Item">
            {this.props.children}
            {this.renderButtons()}
          </div>
        </div>
    );
  }
}

export default SwiperOut;
