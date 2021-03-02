import React from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

// ACTIONS
import { toggleSidebar } from '../redux/actions/sidebarActions';

// SERVICES
import { initiateDbBackup } from '../services/dbBackup.svc';

// COMPONENTS
import AppFrameSection from './AppFrameSection';
import DraggableFrame from './DraggableFrame';
import AppFrame from './AppFrame';
import ToastRender from '../components/ToastRender/ToastRender';
import FrameControls from './FrameControls';
import { quitApp } from '../services/mainProcess.svc';
import Title from './Title';

const remote = require('electron').remote;

const AppFrameContainer = ({ settings }) => {

  const dispatch = useDispatch();

  const toggleClick = () => {
    dispatch(toggleSidebar())
  }

  const { addToast, updateToast } = useToasts();

  const onClose = async () => {
    const { isFetching, data } = settings;
    const { backup_on_exit, enabled } = data.db_backup;

    // in case the backend stopped working
    // allow to close the app without backing up
    if ((isFetching && data.length === 0) || backup_on_exit === false || enabled === false) {
      quitApp();
      return Promise.resolve();
    }

    const id = addToast(<ToastRender spinner={true} message={"מבצע גיבוי בסיס נתונים לפני יציאה..."} />, {
      appearance: "info",
    });

    const promise = await initiateDbBackup().catch((result) => {
      updateToast(id, {
        content: <ToastRender message={result.error} />,
        appearance: "error",
        onDismiss: () => {
          //quitApp();
          console.log("error");
        }
      });
    });

    // success
    if (promise)
      updateToast(id, {
        content: <ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה. המערכת מבצעת כעת יציאה..."} />,
        appearance: "success",
        onDismiss: () => {
          //quitApp();
          console.log("success");
        }
      });

  }

  const onMinimize = () => {
    const window = remote.getCurrentWindow();
    window.minimize();
  }

  const onMaximize = () => {
    const window = remote.getCurrentWindow();

    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  return (
    <AppFrame>

      <DraggableFrame>

        <AppFrameSection>
          {/* <ToggleButton onClick={toggleClick} /> */}
          <Title />
        </AppFrameSection>

        <AppFrameSection>

          <FrameControls onMinimize={onMinimize} onMaximize={onMaximize} onClose={onClose} />

        </AppFrameSection>

      </DraggableFrame>

    </AppFrame>
  );
}

export default AppFrameContainer;