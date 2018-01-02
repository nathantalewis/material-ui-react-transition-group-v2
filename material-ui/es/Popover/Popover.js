var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Modal

import React from 'react';

import ReactDOM from 'react-dom';
import warning from 'warning';
import contains from 'dom-helpers/query/contains';
import debounce from 'lodash/debounce';
import EventListener from 'react-event-listener';
import withStyles from '../styles/withStyles';
import Modal from '../Modal';

import Grow from '../transitions/Grow';
import Paper from '../Paper';

function getOffsetTop(rect, vertical) {
  let offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

function getOffsetLeft(rect, horizontal) {
  let offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map(n => {
    return typeof n === 'number' ? `${n}px` : n;
  }).join(' ');
}

// Sum the scrollTop between two elements.
function getScrollParent(parent, child) {
  let element = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentNode;
    scrollTop += element.scrollTop;
  }
  return scrollTop;
}

export const styles = {
  paper: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 32px)',
    '&:focus': {
      outline: 'none'
    }
  }
};

class Popover extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.componentWillUnmount = () => {
      this.handleResize.cancel();
    }, this.setPositioningStyles = element => {
      if (element && element.style) {
        const positioning = this.getPositioningStyle(element);

        element.style.top = positioning.top;
        element.style.left = positioning.left;
        element.style.transformOrigin = positioning.transformOrigin;
      }
    }, this.getPositioningStyle = element => {
      const { marginThreshold } = this.props;

      // Check if the parent has requested anchoring on an inner content node
      const contentAnchorOffset = this.getContentAnchorOffset(element);
      // Get the offset of of the anchoring element
      const anchorOffset = this.getAnchorOffset(contentAnchorOffset);

      const elemRect = {
        width: element.clientWidth,
        height: element.clientHeight
      };
      // Get the transform origin point on the element itself
      const transformOrigin = this.getTransformOrigin(elemRect, contentAnchorOffset);

      // Calculate element positioning
      let top = anchorOffset.top - transformOrigin.vertical;
      let left = anchorOffset.left - transformOrigin.horizontal;
      const bottom = top + elemRect.height;
      const right = left + elemRect.width;

      // Window thresholds taking required margin into account
      const heightThreshold = window.innerHeight - marginThreshold;
      const widthThreshold = window.innerWidth - marginThreshold;

      // Check if the vertical axis needs shifting
      if (top < marginThreshold) {
        const diff = top - marginThreshold;
        top -= diff;
        transformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        const diff = bottom - heightThreshold;
        top -= diff;
        transformOrigin.vertical += diff;
      }

      warning(elemRect.height < heightThreshold || !elemRect.height || !heightThreshold, ['Material-UI: the popover component is too tall.', `Some part of it can not be seen on the screen (${elemRect.height - heightThreshold}px).`, 'Please consider adding a `max-height` to improve the user-experience.'].join('\n'));

      // Check if the horizontal axis needs shifting
      if (left < marginThreshold) {
        const diff = left - marginThreshold;
        left -= diff;
        transformOrigin.horizontal += diff;
      } else if (right > widthThreshold) {
        const diff = right - widthThreshold;
        left -= diff;
        transformOrigin.horizontal += diff;
      }

      return {
        top: `${top}px`,
        left: `${left}px`,
        transformOrigin: getTransformOriginValue(transformOrigin)
      };
    }, this.transitionEl = undefined, this.handleGetOffsetTop = getOffsetTop, this.handleGetOffsetLeft = getOffsetLeft, this.handleEnter = element => {
      if (this.props.onEnter) {
        this.props.onEnter(element);
      }

      this.setPositioningStyles(element);
    }, this.handleResize = debounce(() => {
      const element = ReactDOM.findDOMNode(this.transitionEl);
      this.setPositioningStyles(element);
    }, 166), _temp;
  }

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  getAnchorOffset(contentAnchorOffset) {
    // $FlowFixMe
    const { anchorEl, anchorOrigin, anchorReference, anchorPosition } = this.props;

    if (anchorReference === 'anchorPosition') {
      return anchorPosition;
    }

    const anchorElement = anchorEl || document.body;
    const anchorRect = anchorElement.getBoundingClientRect();
    const anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

    return {
      top: anchorRect.top + this.handleGetOffsetTop(anchorRect, anchorVertical),
      left: anchorRect.left + this.handleGetOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }

  // Returns the vertical offset of inner content to anchor the transform on if provided
  getContentAnchorOffset(element) {
    const { getContentAnchorEl, anchorReference } = this.props;
    let contentAnchorOffset = 0;

    if (getContentAnchorEl && anchorReference === 'anchorEl') {
      const contentAnchorEl = getContentAnchorEl(element);

      if (contentAnchorEl && contains(element, contentAnchorEl)) {
        const scrollTop = getScrollParent(element, contentAnchorEl);
        contentAnchorOffset = contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
      }

      // != the default value
      warning(this.props.anchorOrigin.vertical === 'top', ['Material-UI: you can not change the default `anchorOrigin.vertical` value when also ', 'providing the `getContentAnchorEl` property to the popover component.', 'Only use one of the two properties', 'Set `getContentAnchorEl` to null or left `anchorOrigin.vertical` unchanged'].join());
    }

    return contentAnchorOffset;
  }

  // Return the base transform origin using the element
  // and taking the content anchor offset into account if in use
  getTransformOrigin(elemRect, contentAnchorOffset = 0) {
    const { transformOrigin } = this.props;
    return {
      vertical: this.handleGetOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
      horizontal: this.handleGetOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }

  render() {
    const _props = this.props,
          {
      anchorEl,
      anchorReference,
      anchorPosition,
      anchorOrigin,
      children,
      classes,
      elevation,
      getContentAnchorEl,
      marginThreshold,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      open,
      PaperProps,
      role,
      transformOrigin,
      transitionClasses,
      transitionDuration
    } = _props,
          other = _objectWithoutProperties(_props, ['anchorEl', 'anchorReference', 'anchorPosition', 'anchorOrigin', 'children', 'classes', 'elevation', 'getContentAnchorEl', 'marginThreshold', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited', 'open', 'PaperProps', 'role', 'transformOrigin', 'transitionClasses', 'transitionDuration']);

    return React.createElement(
      Modal,
      _extends({ show: open, BackdropInvisible: true }, other),
      React.createElement(
        Grow,
        {
          appear: true,
          'in': open,
          onEnter: this.handleEnter,
          onEntering: onEntering,
          onEntered: onEntered,
          onExit: onExit,
          onExiting: onExiting,
          onExited: onExited,
          role: role,
          transitionClasses: transitionClasses,
          timeout: transitionDuration,
          rootRef: node => {
            this.transitionEl = node;
          }
        },
        React.createElement(
          Paper,
          _extends({
            'data-mui-test': 'Popover',
            className: classes.paper,
            elevation: elevation
          }, PaperProps),
          React.createElement(EventListener, { target: 'window', onResize: this.handleResize }),
          children
        )
      )
    );
  }
}

Popover.defaultProps = {
  anchorReference: 'anchorEl',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  transitionDuration: 'auto',
  elevation: 8,
  marginThreshold: 16
};
export default withStyles(styles, { name: 'MuiPopover' })(Popover);