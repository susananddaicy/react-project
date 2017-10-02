import React, { Component, PropTypes } from 'react';
import Marquee from './Marquee';
import './NoticeBar.css';


class NoticeBar extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    };
    
    render() {
      const { children, marqueeProps } = this.props;
      let marquee = {
        loop: false,
        leading: 500,
        trailing: 800,
        fps: 40,
        style: {},
        ...marqueeProps,
      };

      return (
        <div className="NoticeBar flex-hrz">
          <i className="lufont icon-message flex-init"></i>
          <div className="flex-full">
            <Marquee text={children} {...marquee} />
          </div>
        </div>
      );
    }
}
  
export default NoticeBar;



