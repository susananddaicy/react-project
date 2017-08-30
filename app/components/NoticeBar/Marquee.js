import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Marquee extends Component {
    constructor(props) {
      super(props);
      this.state = {
        animatedWidth: 0,
        overflowWidth: 0,
      };
    }

    componentDidMount() {
      this._measureText();
      this._startAnimation();
    }

    componentDidUpdate() {
      this._measureText();
      if (!this._marqueeTimer) {
        this._startAnimation();
      }
    };

    componentWillUnmount() {
      clearTimeout(this._marqueeTimer);
    };

    _measureText() {
        const container = ReactDOM.findDOMNode(this);
        const node = ReactDOM.findDOMNode(this.refs.text);
        if (container && node) {
          const containerWidth = container.offsetWidth;
          const textWidth = node.offsetWidth;
          const overflowWidth = textWidth - containerWidth;
          if (overflowWidth !== this.state.overflowWidth) {
            this.setState({
              overflowWidth,
            });
          }
        }
    };
    

    _startAnimation() {
        clearTimeout(this._marqueeTimer);
        const TIMEOUT = 1 / this.props.fps * 1000;
        const isLeading = this.state.animatedWidth === 0;
        const timeout = isLeading ? this.props.leading : TIMEOUT;
    
        const animate = () => {
          const { overflowWidth } = this.state;
          let animatedWidth = this.state.animatedWidth + 1;
          const isRoundOver = animatedWidth > overflowWidth;
    
          if (isRoundOver) {
            if (this.props.loop) {
              animatedWidth = 0;
            } else {
              return;
            }
          }

          if (isRoundOver && this.props.trailing) {
            this._marqueeTimer = setTimeout(() => {
              this.setState({
                animatedWidth,
              });
              this._marqueeTimer = setTimeout(animate, TIMEOUT);
            }, this.props.trailing);
          } else {
            this.setState({
              animatedWidth,
            });
    
            this._marqueeTimer = setTimeout(animate, TIMEOUT);
          }
        };
    
        if (this.state.overflowWidth !== 0) {
          this._marqueeTimer = setTimeout(animate, timeout);
        }
    };



    render() {
      const { className, text } = this.props;
      const style = {
        position: 'relative',
        right: this.state.animatedWidth,
        whiteSpace: 'nowrap',
        display: 'inline-block',
        ...this.props.style,
      };      
      return (
        <div style={{ overflow: 'hidden' }} role="marquee">
          <div ref="text" style={style}>{text} </div>
        </div>
      );
    }
}




Marquee.propTypes = {
    text: React.PropTypes.string,
    loop: React.PropTypes.bool,
    leading: React.PropTypes.number,
    trailing: React.PropTypes.number,
    fps: React.PropTypes.number,
    className: React.PropTypes.string,
  };


Marquee.defaultProps = {
    text: '',
    loop: false,
    leading: 500,
    trailing: 800,
    fps: 40,
    className: '',
};
  

export default Marquee;



