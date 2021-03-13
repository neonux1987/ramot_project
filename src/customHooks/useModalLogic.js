import { useDispatch } from 'react-redux';
import { showModal, hideModal } from '../redux/actions/modalActions';

export default () => {

  const dispatch = useDispatch();

  const showModal = (modelComponent, props) => {
    dispatch(showModal(modelComponent, props))
  }

  const hideModal = () => {
    setTimeout(() => {
      dispatch(hideModal());
    }, 300);

  }

  return {
    showModal,
    hideModal
  }
}