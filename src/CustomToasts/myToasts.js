import { toast } from "react-toastify";
import styles from './myToasts.module.css'
import { playSound, soundTypes } from "../audioPlayer/audioPlayer";

export const myToasts = {

  info: (content, properties = {}) => (
    toast.info(content, {
      className: styles.info,
      ...properties,
      onOpen: () => {
        properties && properties.onOpen && properties.onOpen();
        playSound(soundTypes.message);
      }
    })
  )
  ,
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
      className: styles.error,
      ...properties
    })
  ),
  dismiss: (id) => toast.dismiss(id),
  TYPE: toast.TYPE

}