// LIBRARIES
import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonWithSound from '../../componentsWithSound/ButtonWithSound/ButtonWithSound';

const ButtonNavLinkWithSound = props => {

  return (
    <ButtonWithSound
      component={NavLink}
      {...props}
    >
      {props.children}
    </ButtonWithSound>
  );
};

export default React.forwardRef((props, ref) =>
  <ButtonNavLinkWithSound innerRef={ref} {...props} />
);