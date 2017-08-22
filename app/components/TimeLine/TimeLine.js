import React, {
  Component,
  PropTypes,
}
from 'react';
import './TimeLine.css';
import _ from 'lodash';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


   // 默认返回false
   //只有经过测量，发现有了shouldComponentUpdate后组件的渲染速度确实有可察觉的提升，你才应该用它。使用shouldComponentUpdate得到的收益一般是微乎其微的。
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) && !_.isEqual(this.state, nextState);
  }

  render () {
    console.log("TimeLine: Render");
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
