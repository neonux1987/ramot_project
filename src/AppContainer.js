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

// HOOKS
import useServices from './customHooks/useServices';

// TOASTS
import CustomToastContainer from './toasts/CustomToastContainer/CustomToastContainer';
import generalSettingsActions from './redux/actions/generalSettingsActions';
import { useLocation } from 'react-router';
import ToggleButton from './Main/Toolbar/ToggleButton/ToggleButton';
import { toggleSidebar } from './redux/actions/toggleSidebarActions';
import AppBarContainer from './layout/AppBar/AppBarContainer';
import Sidebar from './layout/Sidebar/Sidebar';
import Main from './layout/Main/Main';

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
    setPath(() => location.pathname);
  }, [location.pathname]);

  const onClick = () => {
    dispatch(toggleSidebar());
  };

  if (generalSettings.isFetching) {
    return <LogoLoader />;
  }

  return (
    <ThemeContext.Provider value={settings.data.theme}>
      <ScrollToTop mainContainer={mainContainer} />

      <AppWrapper>
        <CssBaseline />
        <ToggleButton onClick={onClick} />
        <AppBarContainer />
        <Sidebar />
        <Main mainContainer={mainContainer} settings={settings} />
      </AppWrapper>

      <CustomToastContainer />
    </ThemeContext.Provider>
  );

}

export default React.memo(AppContainer);