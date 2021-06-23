// LIBRARIES
import React, { useCallback, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router';
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
import { ipcRenderer } from 'electron';

const SidebarContainer = () => {
  const { state = {} } = useLocation();
  const { buildingId } = state;

  const dispatch = useDispatch();

  const showSidebar = useSelector(store => store.toggleSidebar.showSidebar);
  const routes = useSelector(store => store.routes);
  const { data, isFetching } = useSelector(store => store.menu);

  const fetchListener = useCallback(() => {
    dispatch(fetchMenu());
  }, [dispatch])

  useEffect(() => {
    fetchListener();
  }, [fetchListener]);

  // when a new building is added or
  // exisiting building is updated, fetch
  // the menu again to get the updated state
  useEffect(() => {
    ipcRenderer.on("updated-building", fetchListener)
    ipcRenderer.on("added-building", fetchListener)

    return () => {
      ipcRenderer.removeListener("updated-building", fetchListener);
      ipcRenderer.removeListener("added-building", fetchListener);
    }
  }, [fetchListener]);

  return <Sidebar show={showSidebar}>
    <Logo>
      <ControlsContainer routes={routes} buildingId={buildingId} />
    </Logo>

    {isFetching ? <CenteredLoader text="טוען תפריט" color="#ffffff" /> : <MenuContainer routes={routes} data={data} />}
    <Credits />
  </Sidebar>

}

export default SidebarContainer;

