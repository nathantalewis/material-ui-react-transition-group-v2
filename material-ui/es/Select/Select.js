var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Input

import React from 'react';

import warning from 'warning';
import SelectInput from './SelectInput';
import withStyles from '../styles/withStyles';
import Input from '../Input'; // Import to enforce the CSS injection order
import { isMuiElement } from '../utils/reactHelpers';

export const styles = theme => ({
  root: {
    position: 'relative',
    width: '100%'
  },
  select: {
    '-moz-appearance': 'none', // Remove Firefox custom style
    '-webkit-appearance': 'none', // Fix SSR issue
    appearance: 'none', // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    padding: `0 ${theme.spacing.unit * 4}px 2px 0`,
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    minWidth: theme.spacing.unit * 2, // So it doesn't collapse.
    height: `calc(1em + ${theme.spacing.unit * 2 - 2}px)`,
    cursor: 'pointer',
    '&:focus': {
      // Show that it's not an text input
      background: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: 0 // Reset Chrome style
    },
    // Remove Firefox focus border
    '&:-moz-focusring': {
      color: 'transparent',
      textShadow: '0 0 0 #000'
    },
    // Remove IE11 arrow
    '&::-ms-expand': {
      display: 'none'
    }
  },
  selectMenu: {
    width: 'auto', // Fix Safari textOverflow
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: `calc(1em + ${theme.spacing.unit * 2 - 2}px)`
  },
  disabled: {
    cursor: 'default'
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 4,
    color: theme.palette.text.secondary,
    'pointer-events': 'none' // Don't block pinter events on the select under the icon.
  }
});

function Select(props) {
  const {
    autoWidth,
    children,
    classes,
    displayEmpty,
    input,
    InputClasses,
    native,
    multiple,
    MenuProps,
    renderValue
  } = props,
        other = _objectWithoutProperties(props, ['autoWidth', 'children', 'classes', 'displayEmpty', 'input', 'InputClasses', 'native', 'multiple', 'MenuProps', 'renderValue']);

  // Instead of `Element<typeof Input>` to have more flexibility.
  warning(isMuiElement(input, ['Input']), ['Material-UI: you have provided an invalid value to the `input` property.', 'We expect an element instance of the `Input` component.'].join('\n'));

  return React.cloneElement(input, _extends({
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: SelectInput,
    classes: InputClasses
  }, other, {
    inputProps: _extends({}, input ? input.props.inputProps : {}, {
      autoWidth,
      children,
      classes,
      displayEmpty,
      native,
      multiple,
      MenuProps,
      renderValue
    })
  }));
}

Select.defaultProps = {
  autoWidth: false,
  displayEmpty: false,
  input: React.createElement(Input, null),
  native: false,
  multiple: false
};

Select.muiName = 'Select';

export default withStyles(styles, { name: 'MuiSelect' })(Select);