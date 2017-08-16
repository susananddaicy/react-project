import React, {
  Component,
  PropTypes,
}
from 'react';
import './TimeLine.css';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    let li = this.props.itemData ? this.props.itemData.map((item, index) => {
      let isSucess = item.success ? 'TimeLine-box TimeLine-success' : 'TimeLine-box TimeLine-fail';
      return (
        <li className={isSucess} key={index} >
          <p className="TimeLine-title" >
            {item.title}
          </p>
          <div className="TimeLine-desc">
            {item.desc}
            {
              item.hasIcon ? (
                <i className="lufont icon-question" onClick={item.clickIcon}></i>
              ) : null
            }
          </div>
        </li>
        );
    }) : null;

    return (
      <ul className="TimeLine" >{li}</ul>
    );
  }

}

TimeLine.propTypes = {
  itemData: React.PropTypes.array,
};

TimeLine.defaultProps = {
  itemData: [],
};

export default TimeLine;
