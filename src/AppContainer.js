// LIBRARIES
import React, { useRef, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import AppWrapper from './components/AppWrapper/AppWrapper';

// COMPONENTS
import Sidebar from "./Sidebar/Sidebar";
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

// HOOKS
import useServices from './customHooks/useServices';

// ACTIONS
import { fetchSidebar } from './redux/actions/sidebarActions';

// SOUND
import { soundManager } from './soundManager/SoundManager';

// TOASTS
import CustomToastContainer from './toasts/CustomToastContainer/CustomToastContainer';


const { play, types } = soundManager;

const AppContainer = () => {

  const mainContainer = useRef(null);

  const settings = useSelector(store => store.settings);

  const sidebar = useSelector(store => store.sidebar);

  const dispatch = useDispatch();

  const [start] = useServices();

  useEffect(() => {
    dispatch(fetchSidebar());
    // play welcome melody on app start
    play(types.welcome);
  }, [dispatch]);

  useEffect(() => {
    start();
  }, []);

  if (sidebar.isFetching && settings.isFetching) {
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

        <Sidebar />

        <MainContainer mainContainer={mainContainer} toggleMain={"showMainAnimation"} />

      </AppWrapper>

      <CustomToastContainer />
    </ThemeContext.Provider>
  );

}

export default AppContainer;