// LIBRARIES
import React from "react";
import { css } from 'emotion';
import ButtonNavLinkWithSound from "../../componentsWithSound/ButtonNavLinkWithSound/ButtonNavLinkWithSound";
import MoreMenuItem from './MoreMenuItem';

const _link = css`
  :active,:visited,:link{
    color: #000000;
  }
`;

const MoreMenuNavLinkItem = React.forwardRef(({
  to,
  onClick,
  icon,
  label
},
  ref
) => {

  return <MoreMenuItem
    component={ButtonNavLinkWithSound}
    to={to}
    onClick={onClick}
    listItemClass={_link}
    label={label}
    icon={icon}
    exact
    ref={ref}
  />;
});

export default React.memo(MoreMenuNavLinkItem);