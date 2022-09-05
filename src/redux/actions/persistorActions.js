import { getPersistor } from "../store";

export const purgeCache = async () => {
  return await getPersistor().purge();
};

export const flushCache = async () => {
  return await getPersistor().flush();
};
