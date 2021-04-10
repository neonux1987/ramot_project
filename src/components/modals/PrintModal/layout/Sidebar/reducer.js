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
    case 'setOrientation':
      return {
        ...state,
        orientation: action.orientation
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
  orientation: "portrait",
  colors: "colorful",
  range: {
    from: "",
    to: ""
  },
}