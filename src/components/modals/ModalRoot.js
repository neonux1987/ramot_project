import React from 'react';
import { useSelector } from 'react-redux';

export default () => {

  const { ModalComponent, props } = useSelector(store => store.modal);

  if (!ModalComponent) {
    return null;
  }

  return <ModalComponent {...props} />
}