// LIBRARIES
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Route } from 'react-router-dom';
import { css } from 'emotion';
import { updateRoute } from '../redux/actions/routesActions';
import Routes from './Routes';
import Toolbar from './Toolbar/Toolbar';
import BreadcrumbsContainer from './Toolbar/Breadcrumbs/BreadcrumbsContainer';
//import BreadcrumbsContainer from './Toolbar/Breadcrumbs/BreadcrumbsContainer';

const mainStyle = css`
  height: 100%;
  overflow: overlay;
`;

const _main = css`
  display: block;
/*   overflow: overlay; */
  flex-grow: 1;
`;

const MainContainer = ({ mainContainer }) => {

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const routes = useSelector(store => store.routes);
  const [path, setPath] = useState("");

  useEffect(() => {
    const { state = {}, pathname } = routes.active;
    history.replace(pathname, state);

    //eslint-disable-next-line
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

  // make the tool bar hide and re-appear on page change
  // to create a cool animation :D
  useEffect(() => {
    setPath(() => location.pathname)
  }, [location.pathname]);

  return <main id="mainContainer" ref={mainContainer} className={_main}>

    <div className={mainStyle}>

      <Route render={({ location }) => (
        <Routes location={location} />
      )} />

    </div>

  </main>

}

export default MainContainer;