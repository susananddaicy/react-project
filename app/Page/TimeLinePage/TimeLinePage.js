import React, {Component} from 'react';
import TimeLine from '../../components/TimeLine/TimeLine.js';

class TimeLinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
   const data = [
    {
      title:"2015-8-21",
      desc:"text4",
      success:true
    },
    {
      title:"2015-8-21",
      desc:"text3", 
    },
    {
      title:"2015-8-21",
      desc:"text2", 
    },
    {
      title:"2015-8-21",
      desc:"text1", 
    }
   ];

    return (
      <div style={{padding: '1rem'}}>
        <TimeLine itemData={data} />
      </div>
    );
  }
}

export default TimeLinePage;
