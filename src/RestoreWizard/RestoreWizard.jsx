import React from 'react';
import ModalRoot from '../components/modals/ModalRoot';
import Page from '../components/Page/Page';
import Restore from '../pages/Settings/pages/BackupAndRestore/Restore/Restore';
import CustomToastContainer from '../toasts/CustomToastContainer/CustomToastContainer';

const RestoreWizard = () => {

  return <Page>
    <Restore />

    <CustomToastContainer />
    <ModalRoot />
  </Page>;

}



export default RestoreWizard;