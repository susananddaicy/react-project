import React, {PropTypes} from 'react';
import './VipSwiper.css';
import Swiper from '../../../components/Swiper/Swiper.js';

const height = typeof window.getComputedStyle === 'function'
  ? parseInt(window.getComputedStyle(document.documentElement).fontSize, 10) * 4
  : 40;
const swiperOptions = {
  direction: 'vertical',
  spaceBetween: 0,
  autoplay: 2000,
  autoplayDisableOnInteraction: false,
  loop: true,
  height,
};

function VipSwiper(props) {
  const {
    title,
    items,
    displayField,
    onItemClick,
  } = props;

  return (
    <div className="VipSwiper flex-hrz">
      <div className="VipSwiper__title flex-init">{title}</div>
      <div className="flex-full VipSwiper__swiper">
        <Swiper
          swipeOptions={swiperOptions}
          key={items.length}
        >
          {
            items.map((item, index) => (
              <div className="VipSwiper__item flex-hrz swiper-no-swiping" onClick={() => onItemClick(item, index)}>
                <div className="flex-full VipSwiper__title">
                  {item[displayField]}
                </div>
              </div>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

VipSwiper.propTypes = {
  items: PropTypes.array,
  displayField: PropTypes.string,
  onItemClick: PropTypes.func,
};

VipSwiper.defaultProps = {
  displayField: 'showTitle',
};

export default VipSwiper;
