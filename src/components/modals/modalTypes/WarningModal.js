
import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';

import Modal from '../Modal';

export default props => {

  return (
    <Modal
      Icon={WarningIcon}
      agreeBtnText={"המשך"}
      {...props}
    />
  );
}
