import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { checkForUpdates } from '../services/updates.svc';
import { toastManager } from '../toasts/toastManager';

const useServices = () => {

  const dispatch = useDispatch();

  const checkUpdates = useCallback(async () => {
    const promise = await dispatch(checkForUpdates());

    if (promise && promise.data !== null)
      toastManager.appUpdateNewVersion(promise.data.version);
  }, [dispatch]);

  const start = useCallback(() => {
    checkUpdates();
  }, [checkUpdates]);

  return [start];
};

export default useServices;