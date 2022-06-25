// LIBRARIES
import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { updateRoute } from "../../redux/actions/routesActions";
import Main from "./Main";

const MainContainer = ({ mainContainerRef }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const routes = useSelector((store) => store.routes);

  const restoreActveRoute = useRef(() => {
    const { state = {}, pathname } = routes.active;
    history.replace(pathname, state);
  });

  useEffect(() => {
    restoreActveRoute.current();
  }, []);

  useEffect(() => {
    const { pathname, state = {} } = location;

    if (routes.pathname !== pathname) {
      const active = {
        pathname,
        state
      };

      dispatch(updateRoute(active));
    }
  }, [location, routes.pathname, dispatch]);

  return <Main location={location} mainContainerRef={mainContainerRef} />;
};

export default MainContainer;
