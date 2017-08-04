import React from 'react';
import './AccordionHeader.css';

function AccordionHeader(props = {}) {
  const {
    data: {
      status,
      name,
      code,
    },
    isOpen = false,
  } = props;

  return (
    <div className="accordion-header">
      <i className={`icon__triangle ${isOpen ? 'icon__triangle--down' : ''}`}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path d="M6 4l20 12-20 12z"></path>
        </svg>
      </i>
      <span>{name}</span>
      <span>{code}</span>
      <span>{status}</span>
    </div>
  );
}

export default AccordionHeader;
