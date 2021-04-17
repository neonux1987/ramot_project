import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { checkForUpdates } from '../services/updates.svc';
import { toastManager } from '../toasts/toastManager';

const useServices = () => {

  const dispatch = useDispatch();

  const start = useCallback(() => {
    checkUpdates();
  }, []);

  const checkUpdates = async () => {
    const promise = await dispatch(checkForUpdates());

    if (promise)
      toastManager.appUpdateNewVersion(promise.data.version);
  }

  return [start];
};

export default useServices;