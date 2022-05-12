import React from 'react';

import WarningModal from '../modalTypes/WarningModal';

const ConfirmDbPathChangeModal = props => {

  return (
    <WarningModal
      contentText={`
      שינוי מיקום של הגיבויים יאתחל את רשימת הגיבויים השמורים במערכת.
      המערכת לא תמחק את הגיבויים בתיקייה הקודמת אך ניתן יהיה להשתמש בהם רק בשיחזור ידני.
      האם ברצונך להמשיך?
      `}
      {...props}
    />
  );
}

export default ConfirmDbPathChangeModal;