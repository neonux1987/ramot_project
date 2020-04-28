import { toast } from "react-toastify";
import styles from './myToasts.module.css'
import { playSound, soundTypes } from "../audioPlayer/audioPlayer";

export const myToasts = {

  info: (content, properties) => {
    toast.info(content, {
      className: styles.info,
      onOpen: () => {
        playSound(soundTypes.message)
      },
      ...properties
    });
  },
  success: (content, properties) => {
    toast.info(content, {
      className: styles.success,
      onOpen: () => {
        playSound(soundTypes.message)
      },
      ...properties
    });
  },
  warning: (content, properties) => {
    toast.info(content, {
      className: styles.warning,
      onOpen: () => {
        playSound(soundTypes.error)
      },
      ...properties
    });
  },
  error: (content, properties) => {
    toast.info(content, {
      className: styles.error,
      onOpen: () => {
        playSound(soundTypes.error)
      },
      ...properties
    });
  },
  update: (id, properties) => {
    toast.update(id, {
      className: styles.error,
      onOpen: () => {
        playSound(soundTypes.message)
      },
      ...properties
    });
  },
  TYPE: toast.TYPE

}