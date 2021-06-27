import { ipcRenderer } from 'electron';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmBuildingsDeletion from '../components/modals/ConfirmBuildingsDeletion/ConfirmBuildingsDeletion';
import { removeBuildings } from '../redux/actions/buildingsActions';
import { checkForUpdates } from '../services/updates.svc';
import { toastManager } from '../toasts/toastManager';
import useModalLogic from './useModalLogic';

/* 
  this hook is responsible for all the services
  that needed to be started in the initialization
  of the app
*/
const useServices = () => {

  const dispatch = useDispatch();
  const { showModal } = useModalLogic();

  const checkUpdates = useCallback(async () => {
    const promise = await dispatch(checkForUpdates());

    if (promise && promise.data !== null)
      toastManager.appUpdateNewVersion(promise.data.version);
  }, [dispatch]);

  const startListeners = useCallback(async () => {
    ipcRenderer.once("deletion", (event, buildingsForDeletion) => {

      showModal(ConfirmBuildingsDeletion, {
        onAgreeHandler: () => {
          dispatch(removeBuildings(buildingsForDeletion))
        },
        buildingsForDeletion
      });

    });
  }, [dispatch, showModal]);

  const start = useCallback(() => {
    //checkUpdates();
    startListeners();
  }, [startListeners]);

  const stop = useCallback(async () => {

  }, []);

  return [start, stop];
};

export default useServices;