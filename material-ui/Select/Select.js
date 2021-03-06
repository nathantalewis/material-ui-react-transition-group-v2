'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _SelectInput = require('./SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _reactHelpers = require('../utils/reactHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any;
// @inheritedComponent Input

var babelPluginFlowReactPropTypes_proptype_ChildrenArray = require('react').babelPluginFlowReactPropTypes_proptype_ChildrenArray || require('prop-types').any; // Import to enforce the CSS injection order


var styles = exports.styles = function styles(theme) {
  return {
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
      padding: '0 ' + theme.spacing.unit * 4 + 'px 2px 0',
      width: 'calc(100% - ' + theme.spacing.unit * 4 + 'px)',
      minWidth: theme.spacing.unit * 2, // So it doesn't collapse.
      height: 'calc(1em + ' + (theme.spacing.unit * 2 - 2) + 'px)',
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
      lineHeight: 'calc(1em + ' + (theme.spacing.unit * 2 - 2) + 'px)'
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
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * If true, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: require('prop-types').bool,

  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: typeof $ReadOnlyArray === 'function' ? require('prop-types').instanceOf($ReadOnlyArray).isRequired : require('prop-types').any.isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * If `true`, the selected item is displayed even if its value is empty.
   * You can only use it when the `native` property is `false` (default).
   */
  displayEmpty: require('prop-types').bool,

  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element),

  /**
   * `classes` property applied to the `Input` element.
   */
  InputClasses: require('prop-types').object,

  /**
   * If `true`, the component will be using a native `select` element.
   */
  native: require('prop-types').bool,

  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   * You can only use it when the `native` property is `false` (default).
   */
  multiple: require('prop-types').bool,

  /**
   * Properties applied to the `Menu` element.
   */
  MenuProps: require('prop-types').object,

  /**
   * Render the selected value.
   * You can only use it when the `native` property is `false` (default).
   */
  renderValue: require('prop-types').func,

  /**
   * The input value, required for a controlled component.
   */
  value: require('prop-types').oneOfType([typeof $ReadOnlyArray === 'function' ? require('prop-types').instanceOf($ReadOnlyArray) : require('prop-types').any, require('prop-types').string, require('prop-types').number])
};


function Select(props) {
  var autoWidth = props.autoWidth,
      children = props.children,
      classes = props.classes,
      displayEmpty = props.displayEmpty,
      input = props.input,
      InputClasses = props.InputClasses,
      native = props.native,
      multiple = props.multiple,
      MenuProps = props.MenuProps,
      renderValue = props.renderValue,
      other = (0, _objectWithoutProperties3.default)(props, ['autoWidth', 'children', 'classes', 'displayEmpty', 'input', 'InputClasses', 'native', 'multiple', 'MenuProps', 'renderValue']);

  // Instead of `Element<typeof Input>` to have more flexibility.

  process.env.NODE_ENV !== "production" ? (0, _warning2.default)((0, _reactHelpers.isMuiElement)(input, ['Input']), ['Material-UI: you have provided an invalid value to the `input` property.', 'We expect an element instance of the `Input` component.'].join('\n')) : void 0;

  return _react2.default.cloneElement(input, (0, _extends3.default)({
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: _SelectInput2.default,
    classes: InputClasses
  }, other, {
    inputProps: (0, _extends3.default)({}, input ? input.props.inputProps : {}, {
      autoWidth: autoWidth,
      children: children,
      classes: classes,
      displayEmpty: displayEmpty,
      native: native,
      multiple: multiple,
      MenuProps: MenuProps,
      renderValue: renderValue
    })
  }));
}

Select.defaultProps = {
  autoWidth: false,
  displayEmpty: false,
  input: _react2.default.createElement(_Input2.default, null),
  native: false,
  multiple: false
};

Select.muiName = 'Select';

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiSelect' })(Select);