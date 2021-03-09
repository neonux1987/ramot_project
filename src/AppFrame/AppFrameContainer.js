import React from 'react';

// SERVICES
import { initiateDbBackup } from '../services/dbBackup.svc';
import { quitApp } from '../services/mainProcess.svc';
import { toastManager } from '../toasts/toastManager';

// COMPONENTS
import AppFrameSection from './AppFrameSection';
import DraggableFrame from './DraggableFrame';
import AppFrame from './AppFrame';
import ToastRender from '../components/ToastRender/ToastRender';
import FrameControls from './FrameControls';

import Title from './Title';

const remote = require('electron').remote;

const AppFrameContainer = ({ settings }) => {

  const onClose = async () => {
    const { isFetching, data } = settings;
    const { backup_on_exit, enabled } = data.db_backup;

    // in case the backend stopped working
    // allow to close the app without backing up
    if ((isFetching && data.length === 0) || backup_on_exit === false || enabled === false) {
      quitApp();
      return Promise.resolve();
    }

    const id = toastManager.info(<ToastRender spinner={true} message={"מבצע גיבוי בסיס נתונים לפני יציאה..."} />, {
      autoClose: false
    });

    const promise = await initiateDbBackup().catch((result) => {
      toastManager.update(id, {
        render: <ToastRender message={result.error} />,
        type: toastManager.types.ERROR,
        delay: 3000,
        autoClose: 2500,
        onClose: () => {
          quitApp();
        }
      });
    });

    // success
    if (promise)
      toastManager.update(id, {
        render: <ToastRender done={true} message={"גיבוי בסיס הנתונים הסתיים בהצלחה. המערכת מבצעת כעת יציאה..."} />,
        type: toastManager.types.SUCCESS,
        delay: 2000,
        autoClose: 1500,
        onClose: () => {
          quitApp();
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