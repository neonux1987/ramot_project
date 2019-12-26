import React from 'react';
// These are regular React components we will write soon
import ConfirmDeleteAllMonthExpansesModal from './ConfirmDeleteAllMonthExpansesModal/ConfirmDeleteAllMonthExpansesModal';
import { useSelector } from 'react-redux';

const MODAL_COMPONENTS = {
  'CONFIRM_DELETE_ALL_MONTH_EXPANSES': ConfirmDeleteAllMonthExpansesModal
  /* other modals */
}

export default () => {

  const { modalType, modalProps } = useSelector(store => store.modal);

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}