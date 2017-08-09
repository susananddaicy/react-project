import React, { Component } from 'react';
import Swiper from 'swiper';
import './Swiper.css';

function pagination(argPagination) {
  if (argPagination) {
    return <div className="swiper-pagination"></div>;
  }
  return null;
}

function navigationButton(argPrev, argNext) {
  if (argPrev && argNext) {
    return (
      <div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    );
  }
  return null;
}

function scrollBar(argBar) {
  if (argBar) {
    return <div className="swiper-scrollbar"></div>;
  }
  return null;
}

class ReactSwiper extends Component {
  componentDidMount() {
    const { swipeOptions } = this.props;
    this.swipe = new Swiper(this.container, swipeOptions);
  }
  componentWillUnmount() {
    this.swipe.destroy(true, true);
    this.swipe = void 0;
  }
  onResize() {
    this.swipe.onResize();
  }
  getWrapperTranslate(axis = 'x') {
    return this.swipe.getWrapperTranslate(axis);
  }
  setWrapperTranslate(translate) {
    this.swipe.setWrapperTranslate(translate);
  }
  disableMousewheelControl() {
    this.swipe.disableMousewheelControl();
  }
  enableMousewheelControl() {
    this.swipe.enableMousewheelControl();
  }
  disableKeyboardControl() {
    this.swipe.disableKeyboardControl();
  }
  enableKeyboardControl() {
    this.swipe.enableKeyboardControl();
  }
  slideTo(index, speed = 1000, runCallbacks = false) {
    this.swipe.slideTo(index, speed, runCallbacks);
  }
  startAutoplay() {
    this.swipe.startAutoplay();
  }
  stopAutoplay() {
    this.swipe.stopAutoplay();
  }
  destroy(deleteInstance = true, cleanupStyles = false) {
    this.swipe.destroy(deleteInstance, cleanupStyles);
  }
  prev(runCallbacks = false, speed = 1000) {
    this.swipe.slidePrev(runCallbacks, speed);
  }
  next(runCallbacks = false, speed = 1000) {
    this.swipe.slideNext(runCallbacks, speed);
  }
  removeSlide(index) {
    this.swipe.removeSlide(index);
  }
  removeAllSlides() {
    this.swipe.removeAllSlides();
  }
  updateContainerSize() {
    this.swipe.updateContainerSize();
  }
  updateSlidesSize() {
    this.swipe.updateSlidesSize();
  }
  updateProgress() {
    this.swipe.updateProgress();
  }
  updatePagination() {
    this.swipe.updatePagination();
  }
  updateClasses() {
    this.swipe.updateClasses();
  }
  update(updateTranslate = false) {
    this.swipe.update(updateTranslate);
  }
  lockSwipes() {
    this.swipe.lockSwipes();
  }
  unlockSwipes() {
    this.swipe.unlockSwipes();
  }
  lockSwipeToNext() {
    this.swipe.lockSwipeToNext();
  }
  lockSwipeToPrev() {
    this.swipe.lockSwipeToPrev();
  }
  width() {
    return this.swipe.width;
  }
  activeIndex() {
    return this.swipe.activeIndex;
  }
  previousIndex() {
    return this.swipe.previousIndex;
  }
  height() {
    return this.swipe.height;
  }
  touches() {
    return this.swipe.touches;
  }
  params() {
    return this.swipe.params;
  }
  container() {
    return this.swipe.container;
  }
  wrapper() {
    return this.swipe.wrapper;
  }
  slides() {
    return this.swipe.slides;
  }
  bullets() {
    return this.swipe.bullets;
  }
  translate() {
    return this.swipe.translate;
  }
  progress() {
    return this.swipe.progress;
  }
  isBeginning() {
    return this.swipe.isBeginning;
  }
  autoplaying() {
    return this.swipe.autoplaying;
  }
  animating() {
    return this.swipe.animating;
  }
  clickedIndex() {
    return this.swipe.clickedIndex;
  }
  clickedSlide() {
    return this.swipe.clickedSlide;
  }
  prevButton() {
    return this.swipe.prevButton;
  }
  nextButton() {
    return this.swipe.nextButton;
  }
  isEnd() {
    return this.swipe.isEnd;
  }
  render() {
    const { children, swipeOptions, style, className } = this.props;
    const containerStyle = style || {};
    const containerClassName =
      className ? `${className} swiper-container` : 'swiper-container';
    return (
      <div className={containerClassName} style={containerStyle} ref={(el) => { this.container = el; }}>
        <div className="swiper-wrapper">
          {
            React.Children.map(children, child => {
              const childClassName =
                child.props.className ? `${child.props.className} swiper-slide` : ' swiper-slide';
              const childStyle = child.props.style || {};
              return React.cloneElement(child, { className: childClassName, style: childStyle });
            })
          }
        </div>
        {pagination(swipeOptions.pagination)}
        {navigationButton(swipeOptions.prevButton, swipeOptions.nextButton)}
        {scrollBar(swipeOptions.scrollbar)}
      </div>
    );
  }
}

ReactSwiper.propTypes = {
  children: React.PropTypes.any.isRequired,
  swipeOptions: React.PropTypes.object,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
};

export default ReactSwiper;
