import React, {
  PropTypes,
}
from 'react';
import './TimeLine.css';

function TimeLine(props) {
  let li = props.itemData ? props.itemData.map((item, index) => {
    let isSucess = item.success ? 'TimeLine-box TimeLine-success' : 'TimeLine-box TimeLine-fail';
    return (
      <li className={isSucess} key={index} >
        <p className="TimeLine-title" >{item.title}</p>
        <div className="TimeLine-desc">{item.desc}</div>
      </li>
      );
  }) : null;

  return (
    <ul className="TimeLine" >{li}</ul>
  );
}

TimeLine.propTypes = {
  itemData: React.PropTypes.array,
};

TimeLine.defaultProps = {
  itemData: [],
};

export default TimeLine;
