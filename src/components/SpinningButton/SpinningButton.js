import React from 'react';
import classnames from 'classnames';
import { spinner, icon, navLink } from './SpinnerButton.module.css';
import CustomNavLink from '../CustomNavLink/CustomNavLink';

export default props => {
  const {
    Icon,
    to = {},
    active = false
  } = props;
  return (
    <CustomNavLink
      className={classnames(navLink, active ? "activeExpandItem" : "")}
      to={to}
    >
      <Icon className={classnames(icon, spinner)} />
    </CustomNavLink>
  )
}