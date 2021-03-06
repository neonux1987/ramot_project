// LIBRARIES
import React from 'react';
import List from '@material-ui/core/List';

// CSS
import { list } from './Menu.module.css';

const Menu = (props) => {

  return <List
    component="nav"
    aria-labelledby="nested-list-subheader"
    className={list}
  >
    {props.children}
  </List>;

};

export default Menu;