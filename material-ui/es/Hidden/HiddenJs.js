function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import warning from 'warning';

import { keys as breakpointKeys } from '../styles/createBreakpoints';
import withWidth, { isWidthDown, isWidthUp } from '../utils/withWidth';


/**
 * @ignore - internal component.
 */
function HiddenJs(props) {
  const {
    children,
    only,
    xsUp,
    smUp,
    mdUp,
    lgUp,
    xlUp,
    xsDown,
    smDown,
    mdDown,
    lgDown,
    xlDown,
    width
  } = props,
        other = _objectWithoutProperties(props, ['children', 'only', 'xsUp', 'smUp', 'mdUp', 'lgUp', 'xlUp', 'xsDown', 'smDown', 'mdDown', 'lgDown', 'xlDown', 'width']);

  warning(Object.keys(other).length === 0, `Material-UI: unsupported properties received ${JSON.stringify(other)} by \`<Hidden />\`.`);

  let visible = true;

  // `only` check is faster to get out sooner if used.
  if (only) {
    if (Array.isArray(only)) {
      for (let i = 0; i < only.length; i += 1) {
        const breakpoint = only[i];
        if (width === breakpoint) {
          visible = false;
          break;
        }
      }
    } else if (only && width === only) {
      visible = false;
    }
  }

  // Allow `only` to be combined with other props. If already hidden, no need to check others.
  if (visible) {
    // determine visibility based on the smallest size up
    for (let i = 0; i < breakpointKeys.length; i += 1) {
      const breakpoint = breakpointKeys[i];
      const breakpointUp = props[`${breakpoint}Up`];
      const breakpointDown = props[`${breakpoint}Down`];
      if (breakpointUp && isWidthUp(breakpoint, width) || breakpointDown && isWidthDown(breakpoint, width)) {
        visible = false;
        break;
      }
    }
  }

  if (!visible) {
    return null;
  }

  return children;
}

export default withWidth()(HiddenJs);