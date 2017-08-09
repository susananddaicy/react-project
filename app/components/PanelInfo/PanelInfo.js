import React, {
  PropTypes,
} from 'react';
import './PanelInfo.css';
import classNames from 'classnames';

function PanelInfo(props) {
  let lineClass = 'line-topbottom';

  if (props.hideTopLine && props.hideBottomLine) {
    lineClass = '';
  } else {
    if (props.hideTopLine) {
      lineClass = 'line-bottom';
    } else if (props.hideBottomLine) {
      lineClass = 'line-top';
    }
  }

  let className = classNames('PanelInfo', lineClass, props.className);
  // generate body
  let body = props.body ? props.body.map((item, index) =>
    <li key={index} className="flex-hrz">
      {item.label ?
        <div className="PanelInfo-label">
          {item.label}
        </div> : null
      }
      {item.text ?
        <div className="flex-full PanelInfo-text">
          {item.text}
        </div> : null
      }
    </li>
  ) : null;

  return (
    <section className={className}>
      <ul>
        {body}
      </ul>
      {props.children || null}
    </section>
  );
}

PanelInfo.propTypes = {
  className: React.PropTypes.string,
  body: PropTypes.array,
};

PanelInfo.defaultProps = {
  className: '',
  body: [],
};

export default PanelInfo;
