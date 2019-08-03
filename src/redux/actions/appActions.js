const setLoadingStatus = (status) => {
  return {
    type: "SET_LOADING_STATUS",
    payload: status
  }
}

export default {
  setLoadingStatus
}