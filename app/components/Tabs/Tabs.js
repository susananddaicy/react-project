import React, {
  PropTypes,
  Component,
} from 'react';
import classNames from 'classnames';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
    };

    this.tabClickHandler = this.tabClickHandler.bind(this);
  }

  tabClickHandler(index) {
    if (this.state.active === index || this.state.active === -1) return; // 禁止点击已选定的tab分栏

    this.setState({
      active: index,
    });

    if (this.props.callBack) {
      this.props.callBack(this.props.name, index);
    }
  }

  render() {
    let lis = this.props.tabs.map((item, index) => {
      let tabClass =
        classNames({
          'flex-full': true,
          active: index === this.state.active,
          'line-left': (this.props.middleLine && (index !== 0)),
        });
      return (
        <li
          key={index}
          className={tabClass}
          onClick={() => this.tabClickHandler(index)}>
          {item}
        </li>
      );
    });

    return (
      <div className={classNames(this.props.type, this.props.classNames)}>
        <ul className={classNames('flex-hrz', this.props.lineClass)}>
        {lis}
        </ul>
      </div>
    );
  }
}

Tabs.propTypes = {
  name: PropTypes.string,
  tabs: PropTypes.array,
  type: PropTypes.string,
  callBack: PropTypes.func,
  active: PropTypes.number,
  middleLine: PropTypes.bool,
  lineClass: PropTypes.string,
  classNames: PropTypes.string,
};

Tabs.defaultProps = {
  name: 'test1',
  tabs: ['Tab1', 'Tab2'],
  type: 'Default',
  callBack: null,
  active: 0,
  middleLine: false,
  lineClass: 'line-topbottom',
  classNames: '',
};

export default Tabs;
