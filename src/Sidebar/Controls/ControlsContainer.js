import React from 'react';
import EditVatModal from '../../components/modals/EditVatModal/EditVatModal';
import useModalLogic from '../../customHooks/useModalLogic';
import { restartApp } from '../../services/mainProcess.svc'
import Controls from './Controls';

const ControlsContainer = ({ routes }) => {
  return (
    <Controls
      routes={routes}
    />
  );

}

export default React.memo(ControlsContainer);