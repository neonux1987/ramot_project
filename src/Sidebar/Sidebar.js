// LIBRARIES
import React from 'react';
import { Drawer, Slide } from '@material-ui/core';

// CSS
import { drawerPaper, drawer } from './Sidebar.module.css';

const Sidebar = ({ show, children }) => {

  return (
    <Slide direction="left" in={show} timeout={300} mountOnEnter unmountOnExit>
      <Drawer id="sidebar" variant="permanent" anchor="left" classes={{ paper: drawerPaper }} className={drawer}>
        {children}
      </Drawer>
    </Slide>
  );

}

export default React.memo(Sidebar);

