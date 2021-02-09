// LIBRARIES
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import { toggleSidebar } from '../redux/actions/sidebarActions';

const useToggle = () => {

  const dispatch = useDispatch();
  const { showSidebar } = useSelector(store => store.sidebar)

  const onClick = () => dispatch(toggleSidebar());

  return [showSidebar, onClick];
};

export default useToggle;