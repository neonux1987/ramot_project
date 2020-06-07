import React from 'react';
import { toast } from "react-toastify";
import styles from './toastManager.module.css'
import { playSound, soundTypes } from "../audioPlayer/audioPlayer";
import AppUpdateNewVersionToast from "./CustomToasts/AppUpdateNewVersionToast/AppUpdateNewVersionToast";
import AppUpdateInstallToast from "./CustomToasts/AppUpdateInstallToast/AppUpdateInstallToast";

export const myToaster = (() => {


  const AppUpdateNewVersion = (version, properties = {}) => (
    toast(<AppUpdateNewVersionToast version={version} />, {
      className: styles.basic,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.update);
      },
      autoClose: false,
      closeOnClick: false
    })
  )
  const AppUpdateInstall = (version, properties = {}) => (
    toast(<AppUpdateInstallToast version={version} />, {
      className: styles.basic,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.update);
      },
      autoClose: false,
      closeOnClick: false
    })
  )
  const info = (content, properties = {}) => (
    toast.info(content, {
      className: styles.info,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.message);
      }
    })
  )
  const success = (content, properties) => (
    toast.success(content, {
      className: styles.success,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.message);
      }
    })
  )
  const warning = (content, properties) => (
    toast.warning(content, {
      className: styles.warning,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.message);
      }
    })
  )
  const error = (content, properties) => (
    toast.error(content, {
      className: styles.error,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.error);
      }
    })
  )
  const update = (id, properties) => (
    toast.update(id, {
      className: styles[properties.type],
      ...properties
    })
  )
  const dismiss = (id) => toast.dismiss(id)
  const TYPE = toast.TYPE;

  const toastManager = {
    AppUpdateNewVersion,
    AppUpdateInstall,
    info,
    success,
    warning,
    error,
    update,
    dismiss,
    TYPE
  }

  return toastManager;

})();

/* AppUpdateNewVersion: (version, properties = {}) => (
  toast(<AppUpdateNewVersionToast version={version} />, {
    className: styles.basic,
    ...properties,
    onOpen: () => {
      properties && properties.onOpen && properties.onOpen();
      playSound(soundTypes.update);
    },
    autoClose: false,
    closeOnClick: false
  })
),
AppUpdateInstall: (version, properties = {}) => (
  toast(<AppUpdateInstallToast version={version} />, {
    className: styles.basic,
    ...properties,
    onOpen: () => {
      properties && properties.onOpen && properties.onOpen();
      playSound(soundTypes.update);
    },
    autoClose: false,
    closeOnClick: false
  })
),
info: (content, properties = {}) => (
  toast.info(content, {
    className: styles.info,
    ...properties,
    onOpen: () => {
      properties && properties.onOpen && properties.onOpen();
      playSound(soundTypes.message);
    }
  })
),
success: (content, properties) => (
  toast.success(content, {
    className: styles.success,
    ...properties,
    onOpen: () => {
      properties && properties.onOpen && properties.onOpen();
      playSound(soundTypes.message);
    }
  })
),
warning: (content, properties) => (
  toast.warning(content, {
    className: styles.warning,
    ...properties,
    onOpen: () => {
      properties && properties.onOpen && properties.onOpen();
      playSound(soundTypes.message);
    }
  })
),
error: (content, properties) => (
  toast.error(content, {
    className: styles.error,
    ...properties,
    onOpen: () => {
      properties && properties.onOpen && properties.onOpen();
      playSound(soundTypes.error);
    }
  })
),
update: (id, properties) => (
  toast.update(id, {
    className: styles[properties.type],
    ...properties
  })
),
dismiss: (id) => toast.dismiss(id),
TYPE: toast.TYPE

} */