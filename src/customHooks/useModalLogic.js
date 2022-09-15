import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { show, hide } from "../redux/actions/modalActions";

/* 
  this hook shows and hides modal components 
*/
const useModalLogic = () => {
  const dispatch = useDispatch();

  const showModal = useCallback(
    (modelComponent, props) => {
      dispatch(show(modelComponent, props));
    },
    [dispatch]
  );

  const hideModal = useCallback(
    (id) => {
      setTimeout(() => {
        dispatch(hide(id));
      }, 300);
    },
    [dispatch]
  );

  return {
    showModal,
    hideModal
  };
};

export default useModalLogic;
