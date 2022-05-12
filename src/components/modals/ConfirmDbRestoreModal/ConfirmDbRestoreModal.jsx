import React from 'react';

import WarningModal from '../modalTypes/WarningModal';

const ConfirmDbRestoreModal = props => {

  return (
    <WarningModal
      contentText={`
      המערכת תבצע שיחזור של הבסיס נתונים ותדרוס את הבסיס הנתונים הקיים.
      האם ברצונך להמשיך?
      `}
      {...props}
    />
  );
}

export default ConfirmDbRestoreModal;