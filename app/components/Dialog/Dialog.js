import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Mask from '../Mask/Mask';
import './Dialog.css';


class Dialog extends Component {

  constructor(props) {
    super(props);
  }

  renderButtons() {
    return this.props.options.buttons.map((item, idx) => {
      const { label } = item;

      let className = classNames('flex-full', { 'line-left': idx >= 1 });
      return (
        <div key={idx} className={className} >{label}</div>
      );
    });
  }

  render() {
    const { options, children } = this.props;
    const { title, text } = options;
    const className = classNames('Dialog', this.props.className);

    return (
      <div className={className}>
        <Mask />
        <div className="Dialog-body">
          {text ?
            <div className="Dialog-text" style={{ textAlign: text.length > 50 ? 'left' : 'center' }}>
              {title ?
                <div className="Dialog-text-title">
                  {title}
                </div> : null
              }
              {text}
            </div> : null
          }
          {children}
          <div className="flex-hrz Dialog-btns line-top">
            {this.renderButtons()}
          </div>
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  className: PropTypes.string,
  options: PropTypes.object,
};

Dialog.defaultProps = {
  className: '',
  options: {},
};

export default Dialog;
