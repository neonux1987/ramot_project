// LIBRARIES
import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { css } from 'emotion';
import ButtonWithSound from "../../componentsWithSound/ButtonWithSound/ButtonWithSound";

const _listItem = css`
  padding: 6px 16px;
  width: 100%;
  font-size: 16px;
`;

const _listItemIcon = css`
  min-width: 36px;
`;

const MoreMenuItem = React.forwardRef(({
  component = ButtonWithSound,
  icon = null,
  iconColor = "#0e7ab9",
  label = "",
  onClick,
  listItemClass = "",
  ...extraProps
},
  ref
) => {

  return <ListItem
    button={true}
    component={component}
    onClick={onClick}
    className={`${_listItem} ${listItemClass}`}
    ref={ref}
    {...extraProps}
  >
    {icon ? <ListItemIcon className={`${_listItemIcon} ${css`color: ${iconColor}`}`}>
      {icon}
    </ListItemIcon> : null}
    <ListItemText primary={label} />
    {extraProps.children}
  </ListItem>;
})

export default React.memo(MoreMenuItem);