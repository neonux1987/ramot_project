// LIBRARIES
import React, { useState, useEffect } from 'react';
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
import NavButton from './NavButton';
import LoadingCircle from '../components/LoadingCircle';
//import Menuitem from './Menuitem';

// ACTIONS
import { fetchSidebar } from '../redux/actions/sidebarActions';
import Menuitem from './MenuItem/Menuitem';

const activeButtonClass = "activeButton";

const Sidebar = (props) => {

  let toggleSidebarAnimation = "";

  const [state, setState] = useState({
    active: {
      menuItemId: 0,
      subMenuItemId: 0
    },
    homeButtonId: 99,
    settingsButtonId: 100
  });

  const dispatch = useDispatch();

  const { sidebar, showSidebar } = useSelector(store => store.sidebar);

  useEffect(() => {
    dispatch(fetchSidebar());
  }, [dispatch]);

  const activeItem = (menuItemId, subMenuItemId) => {

    //copy active object
    let active = { ...state.active }

    active.menuItemId = menuItemId;
    active.subMenuItemId = subMenuItemId;

    setState({
      ...state,
      active: active
    });

  };

  if (sidebar.isFetching) {
    return <LoadingCircle wrapperStyle={styles.loadingWrapper} textStyle={styles.loadingText} circleStyle={styles.loadingCircle} />;
  }

  const NavigationBtn = ({ page, path, active, activeClass, clicked }) => {
    return <NavButton
      page={page}
      path={path}
      active={active}
      activeClass={activeClass}
      clicked={clicked}
    >
      <Dashboard classes={{ root: styles.listItemIcon }} />
    </NavButton>;
  }

  toggleSidebarAnimation = !showSidebar ? "hideAnimation" : "showAnimation";

  /* const menuItems = sidebar.data.map((item, index) => {
    return (<Menuitem item={item} key={index} active={state.active} clicked={activeItem} expandClick={expandMenuItem} />)
  }); */

  return (
    <Drawer id="sidebar" variant="permanent" classes={{ paper: styles.drawerPaper }} anchor="left" className={classnames(styles.drawer, toggleSidebarAnimation)}>

      <Logo />

      {/* <NavigationBtn
        page="דף הבית"
        path="דף-הבית"
        active={state.active.subMenuItemId === state.homeButtonId || state.active.subMenuItemId === 0}
        activeClass={activeButtonClass}
        clicked={() => (activeItem(state.homeButtonId, state.homeButtonId))}
      /> */}

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
      />

      {/*  <Menu>
        {menuItems}
      </Menu> */}

      <Menu data={sidebar.data} />

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
        />
      </div>
    </Drawer>
  );

}

export default withRouter(Sidebar);

