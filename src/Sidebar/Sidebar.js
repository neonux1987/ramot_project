// LIBRARIES
import React from 'react';
import { Drawer } from '@material-ui/core';

import classnames from 'classnames';

// CSS
import styles from './Sidebar.module.css';
import '../cssTransitions/scale.css';
/* import '../cssTransitions/slide.css'; */

// ACTIONS
import { CSSTransition } from 'react-transition-group';

const Sidebar = ({ show, children }) => {

  const toggleAnimation = !show ? "hideAnimation" : "showAnimation";

  return (
    <CSSTransition
      in={show}
      timeout={600}
      classNames="slide"
    //onEnter={() => dispatch(toggleSidebar())}
    //onExited={() => dispatch(toggleSidebar())}
    >
      <Drawer id="sidebar" variant="permanent" anchor="left" classes={{ paper: styles.drawerPaper }} className={classnames(styles.drawer, toggleAnimation)}>

        {children}

      </Drawer>
    </CSSTransition>
  );

}

export default React.memo(Sidebar);

