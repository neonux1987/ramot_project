import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { spinner, icon, navLink } from './SpinnerButton.module.css';

export default props => {
  const {
    Icon,
    to = {},
    active = false
  } = props;
  return (
    <NavLink
      className={classnames(navLink, active ? "activeExpandItem" : "")}
      to={to}
    >
      <Icon className={classnames(icon, spinner)} />
    </NavLink>
  )
}