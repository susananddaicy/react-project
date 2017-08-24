import React, { Component } from 'react';
import './SwiperOutPage.css';
import SwiperOut from '../../components/SwiperOut/SwiperOut.js';

class SwiperOutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  render() {
    return (
       <SwiperOut
        right={[
        {
          text: 'delete',
          onPress:() => console.log('delete'),
          className: 'custom-class-2',
          style: { backgroundColor: 'red', color: 'white', height: '5rem',lineHeight: '5rem' },
        }
      ]}
       >
         <div className="content">左滑删除</div>
       </SwiperOut>
    );
  }
}

export default SwiperOutPage;
