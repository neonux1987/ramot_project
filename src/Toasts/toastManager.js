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

  constructor() {
    this.settings = remote.getGlobal("sharedObject").settings.notifications;
  }

  types = TYPES;

  reload = () => {
    this.settings = remote.getGlobal("sharedObject").settings.notifications;
  };

  appUpdateNewVersion = (version, properties = {}) => {
    if (!this.settings.enabled)
      return;

    play(types.update);
    return toast(<AppUpdateNewVersionToast version={version} />, {
      className: styles.basic,
      ...properties,
      autoClose: false,
      closeOnClick: false
    });
  };

  appUpdateInstall = (version, properties = {}) => {
    if (!this.settings.enabled)
      return;

    play(types.update);
    toast(<AppUpdateInstallToast version={version} />, {
      className: styles.basic,
      ...properties,
      autoClose: false,
      closeOnClick: false
    });
  };

  basic = (content, properties = {}) => {
    if (!this.settings.enabled)
      return;

    play(types.message);
    return toast.info(content, {
      className: styles.basic,
      ...properties
    });
  };

  info = (content, properties = {}) => {
    if (!this.settings.enabled)
      return;

    play(types.message);
    return toast.info(content, {
      className: styles.info,
      ...properties
    });
  };

  success = (content, properties) => {
    if (!this.settings.enabled)
      return;

    play(types.message);
    return toast.success(content, {
      className: styles.success,
      ...properties
    });
  };

  warning = (content, properties) => {
    if (!this.settings.enabled)
      return;

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
    if (!this.settings.enabled)
      return;

    return toast.update(id, {
      className: styles[properties.type],
      ...properties
    });
  }

  dismiss = (id) => toast.dismiss(id);
}

export const toastManager = new ToastManager();

/* toast = (type,content,options)=>{
  const {enabled} = this.settings;

  if(!enabled)
    return;

  switch(type){
    case types.BASIC:
      return basic(content,options);
      case types.INFO:
        return info(content,options);
      case types.SUCCESS:
        return success(content,options);
      case types.WARNING:
        return warning(content,options);
      case types.ERROR:
        return error(content,options);
      case types.UPDATE:
        return update(content,options);
      case types.DISMISS:
        return dismiss(content,options);
      default:
          return null;
  }

} */