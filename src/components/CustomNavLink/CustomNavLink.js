// LIBRARIES
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRoute } from '../../redux/actions/routesActions';

const CustomNavLink = props => {
  const {
    to,
    onClick,
    children,
  } = props;

  const dispatch = useDispatch();

  const updateRouteHandler = () => {
    const { pathname, state } = to;
    dispatch(updateRoute({ pathname, state }));
  }

  return (
    <NavLink
      {...props}
      onClick={() => {
        updateRouteHandler()
        onClick && onClick();
      }}
    >
      {children}
    </NavLink>
  );
};

export default React.forwardRef((props, ref) =>
  <CustomNavLink innerRef={ref} {...props} />
);