// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Drawer } from '@material-ui/core';
import { Dashboard, Tune } from '@material-ui/icons';
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

// ELECTRON
const menu = require('electron').remote.getGlobal('sharedObject').menuData;

const Sidebar = () => {
  let toggleSidebarAnimation = "";

  const dispatch = useDispatch();

  const { showSidebar } = useSelector(store => store.sidebar);

  const routeState = useSelector(store => store.routes.active.state);

  useEffect(() => {
    //dispatch(fetchSidebar());
  }, [dispatch]);

  if (menu.isFetching) {
    return <LoadingCircle wrapperStyle={styles.loadingWrapper} textStyle={styles.loadingText} circleStyle={styles.loadingCircle} />;
  }

  toggleSidebarAnimation = !showSidebar ? "hideAnimation" : "showAnimation";

  return (
    <Drawer id="sidebar" variant="permanent" classes={{ paper: styles.drawerPaper }} anchor="left" className={classnames(styles.drawer, toggleSidebarAnimation)}>

      <Logo />

      <Menuitem
        className={styles.homeButton}
        label={"דף הבית"}
        Icon={Dashboard}
        to={{
          pathname: `/דף-הבית`,
          state: {
            page: "דף הבית",
            buildingName: "",
            buildingNameEng: ""
          }
        }}
        active={routeState.page === "דף הבית"}
      />

      <Menu data={menu} routeState={routeState} />

      <div className={styles.settingsWrapper}>

        <Menuitem
          className={styles.homeButton}
          label={"הגדרות"}
          Icon={Tune}
          to={{
            pathname: `/הגדרות`,
            state: {
              page: "הגדרות",
              buildingName: "",
              buildingNameEng: ""
            }
          }}
          active={routeState.page === "הגדרות"}
        />
      </div>

    </Drawer>
  );

}

export default withRouter(Sidebar);

