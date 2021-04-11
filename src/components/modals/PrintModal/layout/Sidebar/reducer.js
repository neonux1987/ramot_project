export function reducer(state, action) {
  switch (action.type) {
    case 'setPrinter':
      return {
        ...state,
        printer: action.printer
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
    case 'setRange':
      return {
        ...state,
        range: action.range
      };
    default:
      throw new Error();
  }
};