import React, {
  PropTypes,
  Component,
} from 'react';
import classNames from 'classnames';
import './InputItem.css';

class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideClose: true,
      value: props.value || '',
    };

    ['inputItemChange', 'inputItemBlur', 'inputItemFocus', 'clearInputItem'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.isClearIconClicked = false; // 是否点击了清空按钮
  }

  componentDidMount() {
    if (this.props.autoFocus === 'auto') {
      if (this.InputItem !== null) {
        setTimeout(() => {
          this.InputItem.focus();
        }, 100);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value === 'undefined') return;
    this.setState({
      value: nextProps.value,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState) return false;
    if (typeof nextState.value === 'undefined') return false;
    return true;
  }

  inputItemChange(event) {
    const value = event.target.value;
    let badInput = false;
    if (event.target.validity) {
      badInput = !!event.target.validity.badInput;
    }
    if (this.props.inputFilter(value)) {
      this.setState({
        hideClose: !badInput && (value.length <= 0),
        value, // invalid when badInput
      });
      this.props.inputChangeCallback && this.props.inputChangeCallback(value, badInput);
    }
  }

  inputItemBlur() {
    setTimeout(() => {
      if (this.isClearIconClicked) { // 点击了清空按钮，不触发blur回调
        this.isClearIconClicked = false;
        this.setState({
          hideClose: true,
          value: '',
        });
        return;
      }
      this.props.inputBlurCallback && this.props.inputBlurCallback(this.InputItem.value);

      this.setState({
        hideClose: true,
      });
    }, 0);
  }

  inputItemFocus(event) {
    const value = event.target.value;
    let badInput = false;
    if (event.target.validity) {
      badInput = !!event.target.validity.badInput;
    }
    this.setState({
      hideClose: !badInput && (value.length <= 0),
    });

    this.props.inputFocusCallback && this.props.inputFocusCallback(value);
  }

  clearInputItem() {
    this.isClearIconClicked = true;
    // this.setState({
    //   hideClose: true,
    //   value: '', // invalid when badInput
    // });
    this.props.inputChangeCallback('');
    if (this.InputItem !== null) {
      this.InputItem.value = ''; // badInput
      this.InputItem.focus();
    }
  }

  render() {
    const {
      hideClose,
      value,
    } = this.state;

    const {
      unit,
      disabled,
      hideLabel,
      placeholder,
      inputType,
      iconCallback,
      iconType,
      labelName,
      className,
      pattern = '.*',
      // ...others,
    } = this.props;

    // to fix warning
    const others = {
      autoFocus: this.props.autoFocus,
      maxLength: this.props.maxLength,
      readOnly: this.props.readOnly,
    };

    // 输入框禁用
    if (disabled) {
      others.disabled = 'disabled';
    }

    return (
      <div className={classNames('InputItem', 'flex-hrz', className)}>
        <input
          ref={(ref) => { this.InputItem = ref; }}
          className="InputItem-input flex-init"
          placeholder={placeholder}
          type={inputType}
          onChange={this.inputItemChange}
          onBlur={this.inputItemBlur}
          onFocus={this.inputItemFocus}
          pattern={pattern}
          value={value}
          {...others}
        />
      </div>
    );
  }
}

InputItem.propTypes = {
  placeholder: PropTypes.string,
  inputChangeCallback: PropTypes.func.isRequired,
  inputBlurCallback: PropTypes.func,
  inputFocusCallback: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputType: PropTypes.string,
  inputFilter: PropTypes.func,
};

InputItem.defaultProps = {
  placeholder: '',
  className: '',
  inputType: 'text', // tel
  // pattern: '[0-9]*'//数据键盘
  inputFilter: () => (true),
};

export default InputItem;
