import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './Navbar.css';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.centerView) {
      const centerView = this.props.centerView;
      this.state = {
        selectedIndex: centerView.data ? centerView.data.selectedIndex : '0',
      };
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps, this.props)) {
      const centerView = nextProps.centerView;
      if (centerView && centerView.data && centerView.data.selectedIndex) {
        this.setState({
          selectedIndex: centerView.data.selectedIndex,
        });
      }
    }
  }
  onTabClick(index, onClick) {
    this.setState({
      selectedIndex: `${index}`,
    });
    onClick && onClick({
      index: `${index}`,
    });
  }

  /**
   * 获取leftDOM 结构
   * @param  {[Object]} leftView  props传过来的leftView数据
   * @return {[Node]}   leftView DOM 结构
   */
  getLeftViewDOM(leftView) {
    if (!leftView || leftView.isHide === '1') return null;
    const {
      text,
      icon = 'jiantouzuo',
      class: leftClass,
      style = {},
      onClick,
      ...options,
    } = leftView;
    return (
      <div
        className={classNames('nav-button nav-button-left', leftClass)}
        onClick={(e) => onClick ? onClick(e) : ''}
        style={style}
        {...options}>
        <i className={`lufont icon-${icon}`} /><span>{text}</span>
      </div>);
  }

  /**
   * 获取rightDOM 结构
   * @param  {[Object]} rightView  props传过来的rightView数据
   * @return {[Node]}   rightView DOM 结构
   */
  getRightViewDOM(rightView) {
    if (!rightView || rightView.isHide === '1') return null;
    const {
      text,
      icon,
      class: rightClass,
      style = {},
      onClick,
      ...options,
    } = rightView;

    return (
      <div
        className={classNames('nav-button-right', rightClass)}
        onClick={(e) => onClick ? onClick(e) : ''}
        style={style}
        {...options}>
        {icon ? <i className={`lufont icon-${icon}`} /> : null}
        <span>{text}</span>
      </div>
    );
  }

  getCenterViewDOM(centerView) {
    if (!centerView) return null;
    let centerViewDOM = null;
    if (centerView) {
      const {
        type,
        data = {},
      } = centerView;
      if (type === 'common') {
        const {
          text,
          onClick,
          class: centerClass,
          style = {},
        } = data;
        centerViewDOM = (
          <h1
            className={classNames('major-title', centerClass)}
            onClick={(e) => onClick ? onClick(e) : ''}
            style={style}>{text}
          </h1>);
      } else if (type === 'icon') {
        // TODO
        throw new Error('Navbar: doesnt support!');
      } else if (type === 'tab') {
        const {
          onClick,
          class: centerClass,
          style = {},
          selectClass,
          items = [],
          selectedIndex = '0',
        } = data;
        const activeIndex = this.state.selectedIndex;
        const itemsDOM = items.map((item, index) =>
          (<li
            key={index}
            onClick={() => this.onTabClick(index, onClick)}
            className={classNames('nav-center-tab-item', { 'nav-center-tab-item-select': activeIndex === `${index}` }, centerClass, selectClass)}
            style={style}>
            {item}
          </li>)
        );
        centerViewDOM = (
          <ul className={classNames('flex-hrz', 'nav-center-tab')}>
          {itemsDOM}
          </ul>);
      } else if (type === 'sub') {
        // TODO
        throw new Error('Navbar: doesnt support!');
      }
    }
    return centerViewDOM;
  }
  render() {
    const {
      navBar,
      leftView = null,
      rightView = null,
      centerView,
    } = this.props;
    if (!navBar) return null;
    const {
      title = '',
        fixed = true,
        style: navBarStyle,
        class: navBarClass,
        ...navbarOptions,
    } = navBar;

    const leftViewDOM = this.getLeftViewDOM(leftView);
    const rightViewDOM = this.getRightViewDOM(rightView);
    const centerViewDOM = this.getCenterViewDOM(centerView);
    return (
      <header
        className={classNames('nav-bar', { fixed: fixed }, navBarClass)}
        style={navBarStyle}
        {...navbarOptions}>
        <div className={classNames('flex-hrz', 'nav-title', 'line-bottom')}>
          {leftViewDOM}
          <div className="flex-full">
          {centerViewDOM}
          </div>
          {rightViewDOM}
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {

};

export default Navbar;
