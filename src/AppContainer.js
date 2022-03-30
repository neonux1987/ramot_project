// LIBRARIES
import React, { useRef, useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import AppWrapper from './components/AppWrapper/AppWrapper';

// COMPONENTS
import ScrollToTop from './containers/ScrollToTop/ScrollToTop';
import LogoLoader from './components/AnimatedLoaders/LogoLoader/LogoLoader';

// CONTEXT
import ThemeContext from './context/ThemeContext';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

// CONTAINERS
import MainContainer from './Main/MainContainer';
import SideBarContainer from './Sidebar/SideBarContainer';

// HOOKS
import useServices from './customHooks/useServices';

// TOASTS
import CustomToastContainer from './toasts/CustomToastContainer/CustomToastContainer';
import generalSettingsActions from './redux/actions/generalSettingsActions';
import Toolbar from './Main/Toolbar/Toolbar';
import BreadcrumbsContainer from './Main/Toolbar/Breadcrumbs/BreadcrumbsContainer';
import { useLocation } from 'react-router';

const AppContainer = () => {

  const mainContainer = useRef(null);

  const settings = useSelector(store => store.settings);

  const generalSettings = useSelector(store => store.generalSettings);

  const dispatch = useDispatch();

  const [start, stop] = useServices();

  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    dispatch(generalSettingsActions.fetchGeneralSettings());
  }, [dispatch]);

  useEffect(() => {
    start();

    return () => {
      stop();
    }
  }, [start, stop]);

  useEffect(() => {
    setPath(() => location.pathname)
  }, [location.pathname]);

  if (generalSettings.isFetching) {
    return <LogoLoader />;
  }

  return (
    <ThemeContext.Provider value={settings.data.theme}>

      <ScrollToTop mainContainer={mainContainer} />

      <Toolbar settings={settings} />

      <BreadcrumbsContainer pathname={path} />

      <AppWrapper>

        <CssBaseline />

        <SideBarContainer />

        <MainContainer mainContainer={mainContainer} />

      </AppWrapper>

      <CustomToastContainer />
    </ThemeContext.Provider>
  );

}

export default React.memo(AppContainer);