import { useDispatch } from 'react-redux';
import { show, hide } from '../redux/actions/modalActions';

const useModalLogic = () => {

  const dispatch = useDispatch();

  const showModal = (modelComponent, props) => {
    dispatch(show(modelComponent, props))
  }

  const hideModal = () => {
    setTimeout(() => {
      dispatch(hide());
    }, 300);

  }

  return {
    showModal,
    hideModal
  }
}

export default useModalLogic;