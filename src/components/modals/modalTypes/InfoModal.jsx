
import React from 'react';
import Info from '@material-ui/icons/Info';

import Modal from '../Modal';

const InfoModal = props => {

  return (
    <Modal
      Icon={Info}
      title={"הודעה"}
      agreeBtnText={"המשך"}
      iconColor={"rgb(28, 148, 234)"}
      {...props}
    />
  );
}

export default InfoModal;