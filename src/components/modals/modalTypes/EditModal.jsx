
import React from 'react';
import Edit from '@material-ui/icons/Edit';

import Modal from '../Modal';

const EditModal = props => {

  return (
    <Modal
      Icon={Edit}
      agreeBtnText={"שמור"}
      {...props}
    />
  );
}

export default EditModal;