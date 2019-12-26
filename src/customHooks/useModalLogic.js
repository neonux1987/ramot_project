import { useDispatch } from 'react-redux';
import * as modalActions from '../redux/actions/modalActions';

export default () => {

  const dispatch = useDispatch();

  const showModal = (modelType, modelProps) => {
    dispatch(modalActions.showModal(modelType, modelProps))
  }

  const hideModal = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);

  }

  return {
    showModal,
    hideModal
  }
}