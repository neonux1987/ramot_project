export function reducer(state, action) {
  switch (action.type) {
    case 'setDeviceName':
      return {
        ...state,
        deviceName: action.deviceName
      };
    case 'setPageSize':
      return {
        ...state,
        pageSize: action.pageSize
      };
    case 'setLandscape':
      return {
        ...state,
        landscape: action.landscape
      };
    case 'setColors':
      return {
        ...state,
        colors: action.colors
      };
    case 'setPageRanges':
      return {
        ...state,
        pageRanges: action.pageRanges
      };
    case 'setScaleFactor':
      return {
        ...state,
        scaleFactor: action.scaleFactor
      };
    default:
      throw new Error();
  }
};