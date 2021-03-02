// LIBRARIES
import React from 'react';
import { NavLink } from 'react-router-dom';
import DefaultButton from './DefaultButton';

const ButtonNavLink = props => {

  return <DefaultButton
    component={NavLink}
    {...props}
  >
    {props.children}
  </DefaultButton>;
};

export default React.forwardRef((props, ref) =>
  <ButtonNavLink innerRef={ref} {...props} />
);