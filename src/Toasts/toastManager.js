import React from 'react';
import { toast } from "react-toastify";
import styles from './ToastManager.module.css'
import { soundManager } from "../soundManager/SoundManager";
import AppUpdateNewVersionToast from "./CustomToasts/AppUpdateNewVersionToast/AppUpdateNewVersionToast";
import AppUpdateInstallToast from "./CustomToasts/AppUpdateInstallToast/AppUpdateInstallToast";

const remote = require('electron').remote;

const { play, types } = soundManager;

const TYPES = {
  BASIC: "basic",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  UPDATE: "update",
  DISMISS: "dismiss"
}

class ToastManager {

  types = TYPES;

  appUpdateNewVersion = (version, properties = {}) => {
    play(types.update);
    return toast(<AppUpdateNewVersionToast version={version} />, {
      className: styles.basic,
      ...properties,
      autoClose: false,
      closeOnClick: false
    });
  };

  appUpdateInstall = (version, properties = {}) => {
    play(types.update);
    toast(<AppUpdateInstallToast version={version} />, {
      className: styles.basic,
      ...properties,
      autoClose: false,
      closeOnClick: false
    });
  };

  basic = (content, properties = {}) => {
    play(types.message);
    return toast.info(content, {
      className: styles.basic,
      ...properties
    });
  };

  info = (content, properties = {}) => {
    play(types.message);
    return toast.info(content, {
      className: styles.info,
      ...properties
    });
  };

  success = (content, properties) => {
    play(types.message);
    return toast.success(content, {
      className: styles.success,
      ...properties
    });
  };

  warning = (content, properties) => {
    play(types.warning);
    return toast.warning(content, {
      className: styles.warning,
      ...properties
    });
  };

  error = (content, properties) => {
    play(types.error);
    return toast.error(content, {
      className: styles.error,
      ...properties
    });
  };

  update = (id, properties) => {
    return toast.update(id, {
      className: styles[properties.type],
      ...properties
    });
  }

  dismiss = (id) => toast.dismiss(id);
}

export const toastManager = new ToastManager();