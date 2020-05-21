import React from 'react';
import { toast } from "react-toastify";
import styles from './toastManager.module.css'
import { playSound, soundTypes } from "../audioPlayer/audioPlayer";
import AppUpdateNewVersionToast from "./CustomToasts/AppUpdateNewVersionToast/AppUpdateNewVersionToast";
import AppUpdateInstallToast from "./CustomToasts/AppUpdateInstallToast/AppUpdateInstallToast";

export const myToaster = {

  AppUpdateNewVersion: (version, properties = {}) => (
    toast.info(<AppUpdateNewVersionToast version={version} />, {
      className: styles.basic,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.update);
      },
      autoClose: false
    })
  ),
  AppUpdateInstall: (version, properties = {}) => (
    toast.info(<AppUpdateInstallToast version={version} />, {
      className: styles.basic,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.update);
      },
      autoClose: false
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

}