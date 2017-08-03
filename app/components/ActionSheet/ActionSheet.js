import React, {
  Component,
} from 'react';
import classNames from 'classnames';
import Mask from '../Mask/Mask';
import './ActionSheet.css';

class ActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentWillMount() {
    this.setState({
      isShow: this.props.isShow,
    });
  }

  componentWillReceiveProps(next) {
    this.setState({
      isShow: next.isShow,
    });
  }

  render() {
    const {
      title,
      content,
    } = this.props.data;
    const isShow = this.state.isShow;
    let titleDom = null;
    const cellDom = content.map((item, index) =>
      <div className={classNames({ 'line-bottom': index !== content.length - 1 }, 'ActionSheet-Wrap-Content-Menu-Cell')} onClick={item.callback} key={index}>{item.text}</div>
    );
    if (title) {
      titleDom = <div className="ActionSheet-Wrap-Content-Title line-bottom">{title}</div>;
    }
    return (
      <div className={classNames('ActionSheet', this.props.className)} >
        {isShow ? <Mask /> : null}
        <div className={classNames('ActionSheet-Wrap', isShow ? 'isShow' : '')}>
          <div className="ActionSheet-Wrap-Content">
            {titleDom}
            <div className="ActionSheet-Wrap-Content-Menu">{cellDom}</div>
          </div>
          <div className="ActionSheet-Wrap-Cancel" onClick={this.props.onRequestClose}>取消</div>
        </div>
      </div>
    );
  }
}
ActionSheet.propTypes = {
  className: React.PropTypes.string,
  isShow: React.PropTypes.bool,
  data: React.PropTypes.shape({
    title: React.PropTypes.string,
    content: React.PropTypes.array.isRequired,
  }),
  onRequestClose: React.PropTypes.func,
};

ActionSheet.defaultProps = {
  className: '',
  isShow: false,
  data: {
    title: 'title',
    content: [
      { text: 'This is content', callback: '' },
      { text: 'This is content', callback: '' },
    ],
  },
  onRequestClose: null,
};

export default ActionSheet;
