import React from 'react';

import WarningModal from '../modalTypes/WarningModal';

export default props => {

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
