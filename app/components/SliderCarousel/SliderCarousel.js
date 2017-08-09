import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactSwipe from '../Swiper/Swiper.js';
import classNames from 'classnames';
import './SliderCarousel.css';

class SliderCarousel extends React.Component {

  constructor(props) {
    super(props);

    this.swipeOptions = {
      slidesPerView: 1,
      initialSlide: 0,
      pagination: '.swiper-pagination',
      loop: true,
      speed: 500,
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
    };

    this.domLength = this.props.SliderDomArr.length;

    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.swipeOptions = Object.assign(this.swipeOptions, this.props.options || {});
    if (this.props.onClick) {
      this.swipeOptions.onClick = this.onClick;
    }

    if (this.props.onTransitionEnd) {
      this.swipeOptions.onTransitionEnd = this.onTransitionEnd;
    }
  }

  onClick(swiper) {
    let index = swiper.clickedIndex;
    if (index > this.domLength) {
      index -= this.domLength;
    }

    if (index === 0) {
      index += this.domLength;
    }
    this.props.onClick(--index);
  }

  onTransitionEnd(swiper) {
    let index = swiper.activeIndex;
    if (index > this.domLength) {
      index -= this.domLength;
    }

    this.props.onTransitionEnd(--index);
  }

  render() {
    const className = classNames('SliderCarousel', this.props.className);

    return (
      <div className={className}>
        <ReactSwipe swipeOptions={this.swipeOptions} >
          {this.props.SliderDomArr}
        </ReactSwipe>
      </div>
    );
  }
}

SliderCarousel.propTypes = {
  className: PropTypes.string,
  SliderDomArr: PropTypes.array,
  options: PropTypes.object,
  onClick: PropTypes.func,
  onTransitionEnd: PropTypes.func,
};

export default SliderCarousel;
