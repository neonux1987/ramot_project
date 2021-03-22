// LIBRARIES
import React, { useRef, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import AppWrapper from './components/AppWrapper/AppWrapper';

// COMPONENTS
import AppFrame from './AppFrame/AppFrameContainer';
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

// ACTIONS
import { fetchMenu } from './redux/actions/menuActions';

// TOASTS
import CustomToastContainer from './toasts/CustomToastContainer/CustomToastContainer';
import generalSettingsActions from './redux/actions/generalSettingsActions';

const AppContainer = () => {

  const mainContainer = useRef(null);

  const settings = useSelector(store => store.settings);

  const generalSettings = useSelector(store => store.generalSettings);

  const menu = useSelector(store => store.menu);

  const dispatch = useDispatch();

  const [start] = useServices();

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(generalSettingsActions.fetchGeneralSettings());
  }, [dispatch]);

  useEffect(() => {
    start();
  }, [start]);

  if (menu.isFetching || generalSettings.isFetching) {
    return <LogoLoader />;
  }

  return (
    <ThemeContext.Provider value={settings.data.theme}>

      <ScrollToTop mainContainer={mainContainer} />

      <AppFrame settings={settings} />

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