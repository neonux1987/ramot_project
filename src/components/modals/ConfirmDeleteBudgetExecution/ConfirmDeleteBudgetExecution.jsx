import React from 'react';

import WarningModal from '../modalTypes/WarningModal';

const ConfirmDeleteBudgetExecution = props => {

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

export default ConfirmDeleteBudgetExecution;