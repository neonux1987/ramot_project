
import React from 'react';
import Edit from '@material-ui/icons/Edit';

import Modal from '../Modal';

const EditModal = props => {

  return (
    <Modal
      Icon={Edit}
      iconColor={"#000000"}
      agreeBtnText={"שמור"}
      {...props}
    />
  );
}

export default EditModal;