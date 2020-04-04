
import React from 'react';
import Edit from '@material-ui/icons/Edit';

import Modal from '../Modal';

export default props => {

  return (
    <Modal
      Icon={Edit}
      agreeBtnText={"שמור"}
      {...props}
    />
  );
}
