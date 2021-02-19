// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Drawer } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

// CSS
import styles from './Sidebar.module.css';
import '../cssTransitions/scale.css';

// COMPONENTS
import Menu from './Menu/Menu';
import LoadingCircle from '../components/LoadingCircle';
import Logo from '../AppFrame/Logo/Logo';
import Controls from './Controls/Controls';
//import Menuitem from './Menuitem';

// ACTIONS
import { fetchSidebar, toggleSidebar } from '../redux/actions/sidebarActions';
import SpinningButton from '../components/SpinningButton/SpinningButton';
import { CSSTransition } from 'react-transition-group';

const Sidebar = () => {
  let toggleSidebarAnimation = "";

  const dispatch = useDispatch();

  const { showSidebar, menu } = useSelector(store => store.sidebar);

  const routes = useSelector(store => store.routes);

  useEffect(() => {
    dispatch(fetchSidebar());
  }, [dispatch]);

  if (menu.isFetching) {
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

        {/* <Logo /> */}

        <Controls className={styles.controls} />

        <Menu data={menu.data} routes={routes} />

        <div className={styles.developedByWrapper}>
          <span className={styles.ndtsText}>NDTS</span>
          <span className={styles.developedByText}>developed by</span>
        </div>

      </Drawer>
    </CSSTransition>
  );

}

export default withRouter(Sidebar);

