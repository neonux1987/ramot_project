// LIBRARIES
import React from 'react';
import { Drawer, Slide } from '@material-ui/core';

// CSS
import styles from './Sidebar.module.css';
import '../cssTransitions/scale.css';

const Sidebar = ({ show, children }) => {


  return (
    <Slide direction="left" in={show} timeout={300} mountOnEnter unmountOnExit>
      <Drawer id="sidebar" variant="permanent" anchor="left" classes={{ paper: styles.drawerPaper }} className={styles.drawer}>
        {children}
      </Drawer>
    </Slide>
  );

}

export default React.memo(Sidebar);

