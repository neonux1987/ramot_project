// LIBRARIES
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import { fetchMenu } from '../../redux/actions/menuActions';
import Sidebar from './Sidebar';

const SidebarContainer = () => {
  const dispatch = useDispatch();

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

  return (
    <Sidebar
      activeButton={routes.active.state.page}
      isFetching={isFetching}
      routes={routes}
      data={data}
    />
  );

}

export default SidebarContainer;

