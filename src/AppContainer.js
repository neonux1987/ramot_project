// LIBRARIES
import React, { useRef, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import AppWrapper from './components/AppWrapper/AppWrapper';

// COMPONENTS
import AppFrame from './AppFrame/AppFrameContainer';
import ScrollToTop from './containers/ScrollToTop/ScrollToTop';
import { AlignCenterMiddle } from './components/AlignCenterMiddle/AlignCenterMiddle';
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

// SOUND
import { soundManager } from './soundManager/SoundManager';

// TOASTS
import CustomToastContainer from './toasts/CustomToastContainer/CustomToastContainer';
import generalSettingsActions from './redux/actions/generalSettingsActions';


const { play, types } = soundManager;

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

  useEffect(() => {
    // play welcome melody on app start
    play(types.welcome);
  }, []);

  if (menu.isFetching || generalSettings.isFetching) {
    return <AlignCenterMiddle>
      <LogoLoader />
    </AlignCenterMiddle>;
  }

  return (
    <ThemeContext.Provider value={settings.data.theme}>

      <ScrollToTop mainContainer={mainContainer} />

      <AppFrame settings={settings} />

      <AppWrapper>

        <CssBaseline />

        <SideBarContainer />

        <MainContainer mainContainer={mainContainer} toggleMain={"showMainAnimation"} />

      </AppWrapper>

      <CustomToastContainer />
    </ThemeContext.Provider>
  );

}

export default React.memo(AppContainer);