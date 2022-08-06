import React from "react";
import { toast } from "react-toastify";
import styles from "./toastManager.module.css";
import { soundManager } from "../soundManager/SoundManager";
import AppUpdateNewVersionToast from "./CustomToasts/AppUpdateNewVersionToast/AppUpdateNewVersionToast";
import AppUpdateInstallToast from "./CustomToasts/AppUpdateInstallToast/AppUpdateInstallToast";

const { play, types } = soundManager;

const TYPES = {
  BASIC: "basic",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  UPDATE: "update",
  DISMISS: "dismiss"
};

class ToastManager {
  types = TYPES;

  appUpdateNewVersion = (version, properties = {}) => {
    return toast(<AppUpdateNewVersionToast version={version} />, {
      className: styles.basic,
      ...properties,
      autoClose: false,
      closeOnClick: false,
      onOpen: () => play(types.update)
    });
  };

  appUpdateInstall = (version, properties = {}) => {
    toast(<AppUpdateInstallToast version={version} />, {
      className: styles.basic,
      ...properties,
      autoClose: false,
      closeOnClick: false,
      onOpen: () => play(types.update)
    });
  };

  basic = (content, properties = {}) => {
    return toast.info(content, {
      className: styles.basic,
      onOpen: () => play(types.message),
      ...properties
    });
  };

  info = (content, properties = {}) => {
    return toast.info(content, {
      className: styles.info,
      onOpen: () => play(types.message),
      ...properties
    });
  };

  success = (content, properties) => {
    return toast.success(content, {
      className: styles.success,
      onOpen: () => play(types.message),
      ...properties
    });
  };

  warning = (content, properties) => {
    return toast.warning(content, {
      className: styles.warning,
      onOpen: () => play(types.warning),
      ...properties
    });
  };

  error = (content, properties) => {
    return toast.error(content, {
      className: styles.error,
      autoClose: 5000,
      onOpen: () => play(types.error),
      ...properties
    });
  };

  update = (id, properties) => {
    return toast.update(id, {
      className: styles[properties.type],
      ...properties
    });
  };

  dismiss = (id) => toast.dismiss(id);
}

export const toastManager = new ToastManager();
