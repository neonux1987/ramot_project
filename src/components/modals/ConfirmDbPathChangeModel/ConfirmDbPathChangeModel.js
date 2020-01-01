import React from 'react';

import WarningModal from '../WarningModal';

export default props => {

  return (
    <WarningModal
      title={"אזהרה"}
      contentText={`
      שינוי מיקום של הגיבויים יאתחל את רשימת הגיבויים השמורים במערכת.
      המערכת לא תמחק את הגיבויים בתיקייה הקודמת אך ניתן יהיה להשתמש בהם רק בשיחזור ידני.
      האם ברצונך להמשיך?
      `}
      {...props}
    />
  );
}
