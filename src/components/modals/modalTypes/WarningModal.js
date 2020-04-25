
import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';

import Modal from '../Modal';

export default props => {

  return (
    <Modal
      Icon={WarningIcon}
      agreeBtnText={"המשך"}
      iconColor={"rgb(231, 234, 28)"}
      {...props}
    />
  );
}
