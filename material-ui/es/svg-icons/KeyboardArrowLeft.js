import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../SvgIcon';

/**
 * @ignore - internal component.
 */
let KeyboardArrowLeft = props => React.createElement(
  SvgIcon,
  props,
  React.createElement('path', { d: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' })
);
KeyboardArrowLeft = pure(KeyboardArrowLeft);
KeyboardArrowLeft.muiName = 'SvgIcon';

export default KeyboardArrowLeft;