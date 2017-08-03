import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Mask.css';

function Mask(props) {
  const className = classNames('Mask', props.className, { 'Mask-transparent': props.transparent });

  return (
    <div className={className}></div>
  );
}

Mask.propTypes = {
  transparent: PropTypes.bool,
};

Mask.defaultProps = {
  transparent: false,
};

export default Mask;
