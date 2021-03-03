// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Drawer } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

// CSS
import styles from './Sidebar.module.css';
import '../cssTransitions/scale.css';
/* import '../cssTransitions/slide.css'; */

// COMPONENTS
import Menu from './Menu/Menu';
import LoadingCircle from '../components/LoadingCircle';
import Logo from './Logo/Logo';
import Controls from './Controls/Controls';

// ACTIONS
import { CSSTransition } from 'react-transition-group';

const Sidebar = () => {
  let toggleSidebarAnimation = "";

  const { data, isFetching } = useSelector(store => store.menu);
  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);

  const routes = useSelector(store => store.routes);

  if (isFetching) {
    return <LoadingCircle wrapperStyle={styles.loadingWrapper} textStyle={styles.loadingText} circleStyle={styles.loadingCircle} />;
  }

  toggleSidebarAnimation = !showSidebar ? "hideAnimation" : "showAnimation";

  return (
    <CSSTransition
      in={showSidebar}
      timeout={600}
      classNames="slide"
    //onEnter={() => dispatch(toggleSidebar())}
    //onExited={() => dispatch(toggleSidebar())}
    >
      <Drawer id="sidebar" variant="permanent" classes={{ paper: styles.drawerPaper }} anchor="left" className={classnames(styles.drawer, toggleSidebarAnimation)}>

        <Logo />

        <Controls className={styles.controls} />

        <Menu data={data} routes={routes} />

        <div className={styles.developedByWrapper}>
          <span className={styles.ndtsText}>NDTS</span>
          <span className={styles.developedByText}>developed by</span>
        </div>

      </Drawer>
    </CSSTransition>
  );

}

export default withRouter(Sidebar);

