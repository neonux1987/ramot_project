import React from 'react';

import InfoModal from '../modalTypes/InfoModal';

const BackupOnExitModal = props => {

  return (
    <InfoModal
      contentText={`
      האם לבצע גיבוי בסיס נתונים ביציאה?
      `}
      cancelBtnText={"צא ללא גיבוי"}
      {...props}
    />
  );
}

export default BackupOnExitModal;