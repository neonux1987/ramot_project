import React from 'react';

import WarningModal from '../modalTypes/WarningModal';

export default props => {

  return (
    <WarningModal
      contentText={`
      מחיקת סעיף זה יגרור למחיקה של סעיף בטבלת מעקב שנתית בעמוד סיכום תקציבי.
      המחיקה היא לצמיתות. לאישור לחץ המשך.
      `}
      {...props}
    />
  );
}
