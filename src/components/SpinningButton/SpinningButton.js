import React from 'react';
import classnames from 'classnames';
import { spinner, icon, navLink } from './SpinnerButton.module.css';
import ButtonNavLink from '../ButtonNavLink/ButtonNavLink';
import { css } from 'emotion';

export default props => {
  const {
    Icon,
    to = {},
    active = false,
    className
  } = props;
  return (
    <ButtonNavLink
      className={classnames(className, navLink, active ? "activeExpandItem" : "", css`min-width:0`)}
      to={to}
    >
      <Icon className={classnames(icon, spinner)} />
    </ButtonNavLink>
  )
}