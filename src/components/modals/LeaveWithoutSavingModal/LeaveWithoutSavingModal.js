import React from 'react';

import InfoModal from '../modalTypes/InfoModal';

export default props => {

  return (
    <InfoModal
      cancelBtnText={"הישאר"}
      contentText={`
      האם אתה בטוח שברצונך להמשיך ללא שמירת ההגדרות?
      `}
      {...props}
    />
  );
}
