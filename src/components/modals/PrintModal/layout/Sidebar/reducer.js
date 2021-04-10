export function reducer(state, action) {
  switch (action.type) {
    case 'setPrinter':
      return {
        ...state,
        printer: action.printer
      };
    case 'setSize':
      return {
        ...state,
        size: action.size
      };
    case 'setPages':
      return {
        ...state,
        pages: action.pages
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
        range: {
          from: action.from,
          to: action.to
        }
      };
    default:
      throw new Error();
  }
};

export const initialState = {
  printer: "",
  size: "A4",
  pages: "all",
  landscape: false,
  colors: true,
  range: {
    from: 0,
    to: 0
  },
}