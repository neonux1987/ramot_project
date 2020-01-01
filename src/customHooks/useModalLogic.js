import { useDispatch } from 'react-redux';
import * as modalActions from '../redux/actions/modalActions';

export default () => {

  const dispatch = useDispatch();

  const showModal = (modelComponent, props) => {
    dispatch(modalActions.showModal(modelComponent, props))
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