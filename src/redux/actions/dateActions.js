
/**
 * set current date
 */
const setCurrentDate = () => ({
  type: "SET_CURRENT_DATE"
});

/**
 * update date
 * @param {*} payload 
 */
const updateDate = (payload = Object) => ({
  type: "UPDATE_DATE",
  payload: payload
});


export default {
  setCurrentDate,
  updateDate
};