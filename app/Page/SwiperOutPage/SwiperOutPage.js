import React, {
  Component
} from 'react';
import './SwiperOutPage.css';
import SwiperOut from '../../components/SwiperOut/SwiperOut.js';

class SwiperOutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
       <div className="content">不可滑动删除</div>
       <SwiperOut
        right={[
          {
            text: 'delete',
            onPress:() => console.log('delete'),
            className: 'custom-class-2',
            style: { backgroundColor: 'red', color: 'white', height: '8rem',lineHeight: '8rem',fontSize: '2rem' },
          }
        ]}
       >
         <div className="content">左滑删除，一个按钮</div>
       </SwiperOut>

       <SwiperOut
        right={[
          {
            text: 'cancel',
            onPress:() => console.log('cancel'),
            className: 'custom-class-1',
            style: { backgroundColor: 'gray', color: 'white', height: '8rem',lineHeight: '8rem',fontSize: '1rem' },
          },
          {
            text: 'delete',
            onPress:() => console.log('delete'),
            className: 'custom-class-2',
            style: { backgroundColor: 'red', color: 'white', height: '8rem',lineHeight: '8rem',fontSize: '1rem' },
          }
        ]}
       >
         <div className="content">左滑删除,2个按钮</div>
       </SwiperOut>  
       <SwiperOut
        right={[
          {
            text: 'delete',
            onPress:() => console.log('delete'),
            className: 'custom-class-2',
            style: { backgroundColor: 'red', color: 'white', height: '8rem',lineHeight: '8rem' ,fontSize: '2rem'},
          }
        ]}
       >
         <div className="content">左滑删除</div>
       </SwiperOut>  
       <SwiperOut
        right={[
          {
            text: 'delete',
            onPress:() => console.log('delete'),
            className: 'custom-class-2',
            style: { backgroundColor: 'red', color: 'white', height: '8rem',lineHeight: '8rem' ,fontSize: '2rem'},
          }
        ]}
       >
         <div className="content">左滑删除</div>
       </SwiperOut>  

        <SwiperOut
        right={[
          {
            text: 'delete',
            onPress:() => console.log('delete'),
            className: 'custom-class-2',
            style: { backgroundColor: 'red', color: 'white', height: '8rem',lineHeight: '8rem' ,fontSize: '2rem'},
          }
        ]}
       >
         <div className="content">左滑删除</div>
       </SwiperOut>  
       
        <SwiperOut
        right={[
          {
            text: 'delete',
            onPress:() => console.log('delete'),
            className: 'custom-class-2',
            style: { backgroundColor: 'red', color: 'white', height: '8rem',lineHeight: '8rem' ,fontSize: '2rem'},
          }
        ]}
       >
         <div className="content">左滑删除</div>
       </SwiperOut>  
       

        <SwiperOut
        right={[
          {
            text: 'delete',
            onPress:() => console.log('delete'),
            className: 'custom-class-2',
            style: { backgroundColor: 'red', color: 'white', height: '8rem',lineHeight: '8rem' ,fontSize: '2rem'},
          }
        ]}
       >
         <div className="content">左滑删除</div>
       </SwiperOut>                    

       </div>
    );
  }
}

export default SwiperOutPage;