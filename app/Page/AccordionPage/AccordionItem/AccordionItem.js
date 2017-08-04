import React from 'react';
import './AccordionItem.css';

function AccordionItem(props = {}) {
  const {
    data: {
      item,
    }
  } = props;
  return (
    <div className="accordion--item">
      <div>{item}</div>
    </div>
  )
}
export default AccordionItem;
