import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import CustomCloseButton from '../../components/buttons/CustomCloseButton/CustomCloseButton';

const CustomToastContainer = () => {

  const printMode = useSelector(store => store.print.printMode);
  const toastContainerProps = useSelector(store => store.settings.data.notifications.toastContainerProps);

  const {
    width,
    position,
    autoClose,
    hideProgressBar,
    newestOnTop,
    rtl,
    pauseOnVisibilityChange,
    draggable,
    pauseOnHover
  } = toastContainerProps;

  return (
    <ToastContainer
      style={{
        width,
        display: printMode ? "none" : "block"
      }}
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      rtl={rtl}
      pauseOnVisibilityChange={pauseOnVisibilityChange}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      closeButton={<CustomCloseButton />}
    />
  )
};

export default CustomToastContainer;