import React from 'react';
import { useSelector } from 'react-redux';

const ModalRoot = () => {

  const { ModalComponent, props } = useSelector(store => store.modal);

  if (!ModalComponent) {
    return null;
  }

  return <ModalComponent {...props} />
}

export default ModalRoot;