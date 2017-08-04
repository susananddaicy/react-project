import React from 'react';
import Scroller from './Scroller.js';
import PickerBg from './PickerBg.js';
import SlideUp from './SlideUp.js';
import './Picker.css';

export default class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.scrollerList = {};
    this._bindFunc();
  }

  _onConfirm() {
    const {
      onConfirm
    } = this.props;
    let selectedValues = this.props.columns.map((column,index) => {
      let activeIndex = this.scrollerList[`scroller${index}`].state.activeIndex;
      return {
        index:activeIndex,
        values: column.values[activeIndex]
      };
    });
    onConfirm && onConfirm.call(this,selectedValues);
  }

  render() {
    return (
      <SlideUp isShown={this.props.shown} title={this.props.title} onCancel={this.props.onCancel} onConfirm={this._onConfirm}>
        <div className="Picker__content">
         {this._renderScrollers()}
          <PickerBg/>
        </div>
      </SlideUp>
    );
  }
  _renderScrollers() {
    return this.props.columns.map((column,index)=>{
      return (<Scroller ref={(el) => this.scrollerList[`scroller${index}`]=el} items={column.values} key={index} align={column.align} activeIndex={column.activeIndex} onItemSelected={column.onItemSelected}/>);
    });
  }
  _bindFunc() {
    this._renderScrollers = this._renderScrollers.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }
}

Picker.propTypes = {
  columns : React.PropTypes.arrayOf(React.PropTypes.shape({
      align : React.PropTypes.string,
      values : React.PropTypes.array,
      activeIndex : React.PropTypes.number,
      onItemSelected : React.PropTypes.func,
  })),
  shown: React.PropTypes.bool,
  title: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onConfirm: React.PropTypes.func,
}
