import { getPersistor } from "../store";

export const purgeCache = () => {
  return getPersistor().purge();
};
