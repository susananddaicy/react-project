import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import onScrollEvent from './scrollEvent';
import './Accordion.css';

function selectAccordionGroups(container) {
  let elements = null;
  return (selector) => elements || (elements = Array.prototype.slice.call(container.querySelectorAll(selector)));
}

function createStyleStr({ zIndex, translateY }) {
  return [
    `z-index:${zIndex};`,
    `-ms-transform:translateY(${translateY}px);`,
    `-moz-transform:translateY(${translateY}px);`,
    `-webkit-transform:translateY(${translateY}px);`,
    `-o-transform:translateY(${translateY}px);`,
    `transform:translateY(${translateY}px);`,
  ].join('');
}

function AccordionCreator({ AccordionHeader, AccordionItem, onScroll = onScrollEvent }) {
  class Accordion extends Component {
    constructor(props) {
      super(props);

      this.state = {
        openList: [],
      };
    }

    componentDidMount() {
      const getAccordionGroups = selectAccordionGroups(findDOMNode(this.refs.accordion));
      onScroll(() => {
        const {
          openList,
        } = this.state;
        getAccordionGroups('.accordion__list>li')
          .forEach((element) => {
            let translateY = 0;
            let zIndex = -100;
            if (openList.indexOf(parseInt(element.dataset.index, 10)) >= 0) {
              const {
                top,
                bottom,
              } = element.getBoundingClientRect();
              const header = element.firstElementChild;
              const {
                height: headerHeight,
              } = header.getBoundingClientRect();
              if (top <= 1 && bottom >= -headerHeight) {
                zIndex = 100;
                if (bottom <= 0) {
                  translateY = -headerHeight;
                } else if (bottom <= headerHeight) {
                  translateY = bottom - headerHeight;
                }
              }
            }
            const style = createStyleStr({ zIndex, translateY });
            element.querySelector('.accordion__floating').setAttribute('style', style);
          });
      });
    }

    toggleAccordion(index) {
      return () => {
        const { openList } = this.state;
        if (openList.some(item => item === index)) {
          this.setState({
            openList: openList.filter(item => item !== index),
          });
        } else {
          this.setState({
            openList: openList.concat(index),
          });
        }
      };
    }

    render() {
      const {
        list = [],
        childField,
        shouldFixHeader,
      } = this.props;
      const {
        openList,
      } = this.state;
      return (
        <div className="accordion" ref="accordion">
          <ul className="accordion__list">
            {
              list.map((group, ind) => {
                const childData = group[childField];
                const isOpen = openList.find(item => item === ind) != null;
                return (
                  <li key={`accordion-group-${ind}`} data-index={ind}>
                    <header
                      onClick={this.toggleAccordion(ind)}
                    >
                      <AccordionHeader
                        data={group}
                        isOpen={isOpen}
                      />
                    </header>
                    <ul style={{ display: isOpen ? 'block' : 'none' }}>
                      {
                        childData.map((item, index) => (
                          <li
                            className="accordion__item"
                            key={`accordion-item-${index}`}
                          >
                            <AccordionItem
                              data={item}
                            />
                          </li>
                        ))
                      }
                    </ul>
                    {shouldFixHeader && (
                      <header
                        onClick={this.toggleAccordion(ind)}
                        className="accordion__floating"
                      >
                        <AccordionHeader
                          data={group}
                          isOpen={isOpen}
                        />
                      </header>
                    )}
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    }
  }

  Accordion.propTypes = {
    list: PropTypes.array.isRequired,
    childField: PropTypes.string,
    shouldFixHeader: PropTypes.bool,
  };

  Accordion.defaultProps = {
    childField: 'children',
    shouldFixHeader: true,
  };

  return Accordion;
}

export default AccordionCreator;
