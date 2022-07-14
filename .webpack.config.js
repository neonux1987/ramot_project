// define child rescript
module.exports = (config) => {
  console.log("waaazzzzzaaaaaaa");
  config.target = "electron-renderer";
  /* config.output = {
    path: '/',
    publicPath: '/'
  } */
  /* config.optimization = {
    minimize: false
  } */
  return config;
};
