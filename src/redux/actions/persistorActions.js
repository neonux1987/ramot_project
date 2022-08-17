import { getPersistor } from "../store";

export const purgeCache = async () => {
  return await getPersistor().purge();
};
