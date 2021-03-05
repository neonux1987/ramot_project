// LIBRARIES
import React from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

// COMPONENTS
import Logo from './Logo/Logo';
import ControlsContainer from './Controls/ControlsContainer';

// ACTIONS
import Sidebar from './Sidebar';
import Credits from './Credits/Credits';
import MenuContainer from './Menu/MenuContainer';

const SidebarContainer = () => {

  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);

  return <Sidebar show={showSidebar}>
    <Logo />
    <ControlsContainer />
    <MenuContainer />
    <Credits />
  </Sidebar>

}

export default withRouter(SidebarContainer);

