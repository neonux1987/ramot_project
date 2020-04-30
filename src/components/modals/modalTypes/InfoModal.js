
import React from 'react';
import Info from '@material-ui/icons/Info';

import Modal from '../Modal';

export default props => {

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
