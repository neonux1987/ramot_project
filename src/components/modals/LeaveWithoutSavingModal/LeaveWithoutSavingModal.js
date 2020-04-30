import React from 'react';

import WarningModal from '../modalTypes/WarningModal';

export default props => {

  return (
    <WarningModal
      disableBackdropClick={true}
      title={"אזהרה"}
      agreeBtnText={"המשך"}
      cancelBtnText={"הישאר"}
      contentText={`
      האם אתה בטוח שברצונך להמשיך ללא שמירת ההגדרות?
      `}
      {...props}
    />
  );
}
