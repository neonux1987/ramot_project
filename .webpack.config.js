// define child rescript
module.exports = config => {
  config.target = 'electron-renderer';
  /* config.output = {
    path: '/',
    publicPath: '/'
  } */
  return config;

}