// define child rescript
module.exports = config => {
  config.target = 'electron-renderer';
  /* config.output = {
    path: '/',
    publicPath: '/'
  } */
  /* config.optimization = {
    minimize: false
  } */
  return config;

}