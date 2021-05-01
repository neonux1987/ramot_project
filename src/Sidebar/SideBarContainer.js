// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Logo from './Logo/Logo';
import ControlsContainer from './Controls/ControlsContainer';

// ACTIONS
import Sidebar from './Sidebar';
import Credits from './Credits/Credits';
import MenuContainer from './Menu/MenuContainer';
import { fetchMenu } from '../redux/actions/menuActions';
import CenteredLoader from '../components/AnimatedLoaders/CenteredLoader';

const SidebarContainer = () => {

  const dispatch = useDispatch();

  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);
  const routes = useSelector(store => store.routes);
  const { data, isFetching } = useSelector(store => store.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return <Sidebar show={showSidebar}>
    <Logo>
      <ControlsContainer routes={routes} />
    </Logo>

    {isFetching ? <CenteredLoader text="טוען תפריט" color="#ffffff" /> : <MenuContainer routes={routes} data={data} />}
    <Credits />
  </Sidebar>

}

export default withRouter(SidebarContainer);

