import React from 'react';
import ReactDom from 'react-dom';
import './PickerBg.css';

export default class PickerBg extends React.Component {
	render() {
    const itemHeight = parseInt(this.props.height,10) / 3;
		return (
      <ul className="picker-bg" style={{height:this.props.height,backgroundColor:this.props.background}}>
          <li className="picker-bg-item line-bottom" style={{height:`${itemHeight}px`}}>
            <div className=""/>
          </li>
          <li className="picker-bg-item line-bottom"  style={{height:`${itemHeight}px`}}>
            <div className=""/>
          </li>
          <li className="picker-bg-item" style={{height:`${itemHeight}px`}}/>
      </ul>
    );
	}
}

PickerBg.propTypes = {
  height:React.PropTypes.string,
  background:React.PropTypes.string
};

PickerBg.defaultProps = {
  background:'#fff',
  height:'180px',
};
