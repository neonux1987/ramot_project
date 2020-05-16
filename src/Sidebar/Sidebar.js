// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Drawer } from '@material-ui/core';
import { Dashboard } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

// CSS
import styles from './Sidebar.module.css';

// COMPONENTS
import Menu from './Menu/Menu';
import Logo from './Logo/Logo'
import LoadingCircle from '../components/LoadingCircle';
//import Menuitem from './Menuitem';

// ACTIONS
import { fetchSidebar } from '../redux/actions/sidebarActions';
import Menuitem from './MenuItem/Menuitem';

const Sidebar = () => {
  let toggleSidebarAnimation = "";

  const dispatch = useDispatch();

  const { showSidebar, menu } = useSelector(store => store.sidebar);

  const routeState = useSelector(store => store.routes.active.state);

  useEffect(() => {
    dispatch(fetchSidebar());
  }, [dispatch]);

  if (menu.isFetching) {
    return <LoadingCircle wrapperStyle={styles.loadingWrapper} textStyle={styles.loadingText} circleStyle={styles.loadingCircle} />;
  }

  toggleSidebarAnimation = !showSidebar ? "hideAnimation" : "showAnimation";

  return (
    <Drawer id="sidebar" variant="permanent" classes={{ paper: styles.drawerPaper }} anchor="left" className={classnames(styles.drawer, toggleSidebarAnimation)}>

      <Logo />


      <Menu data={menu.data} routeState={routeState} />

      <div className={styles.developedByWrapper}>
        <span className={styles.ndtsText}>NDTS</span>
        <span className={styles.developedByText}>developed by</span>
      </div>

    </Drawer>
  );

}

export default withRouter(Sidebar);

