import React, {
  Component,
} from 'react';
import './Slider.css';
import SliderCarousel from '../../components/SliderCarousel';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click(index) {
    alert(index);
  }

  render() {
    const options = {
      slidesPerView: 1,
      initialSlide: 0,
      pagination: '.swiper-pagination',
      loop: true,
      speed: 500,
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
    };


    const SliderDomArr = [
      <div key="pane1"><img src={require('./2.pic_hd.jpg')} /></div>,
      <div key="pane2"><img src={require('./3.pic_hd.jpg')} /></div>,
    ];

    return (
      <SliderCarousel className="Slider" SliderDomArr={SliderDomArr} options={options} onClick={this.click} />
    )
  }
}

export default Slider;
