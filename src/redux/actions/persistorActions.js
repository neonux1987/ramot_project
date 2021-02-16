import { persistor } from "../store"

export const flushCache = () => {
  return persistor.purge();
}