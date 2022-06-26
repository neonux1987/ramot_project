// LIBRARIES
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ipcRenderer } from "electron";
import { fetchMenu } from "../../redux/actions/menuActions";
import Sidebar from "./Sidebar";

const SidebarContainer = () => {
  const dispatch = useDispatch();

  const routes = useSelector((store) => store.routes);
  const { data, isFetching } = useSelector((store) => store.menu);

  const fetchMenuRef = useRef(() => {
    dispatch(fetchMenu());
  });

  useEffect(() => {
    fetchMenuRef.current();
  }, []);

  // when a new building is added or
  // exisiting building is updated, fetch
  // the menu again to get the updated state
  useEffect(() => {
    // remove previous listeners if exist
    // before registering new ones
    ipcRenderer.removeAllListeners("updated-building");
    ipcRenderer.removeAllListeners("added-building");

    ipcRenderer.on("updated-building", fetchMenuRef.current);
    ipcRenderer.on("added-building", fetchMenuRef.current);

    return () => {
      ipcRenderer.removeAllListeners("updated-building");
      ipcRenderer.removeAllListeners("added-building");
    };
  }, []);

  return (
    <Sidebar
      activeButton={routes.active.state.page}
      isFetching={isFetching}
      routes={routes}
      data={data}
    />
  );
};

export default SidebarContainer;
