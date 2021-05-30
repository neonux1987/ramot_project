import { persistor } from "../store"

export const purgeCache = () => {
  return persistor.purge();
}