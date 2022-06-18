// TYPES
export const TYPES = {
  UPDATE_TEMPLATE: "UPDATE_TEMPLATE"
};

export const updateTemplate = function ({ pageName, key, value }) {
  return (dispatch) => {
    dispatch({
      type: TYPES.UPDATE_TEMPLATE,
      pageName,
      key,
      value
    });
  };
};
