import React from 'react';

import WarningModal from '../WarningModal';

export default props => {

  return (
    <WarningModal
      title={"אזהרה"}
      contentText={`
      מחיקה של סעיף מסכם במעקב ביצוע מול תקציב תגרור מחיקה של כל ההוצאות
      בכל החודשים הקשורים לרבעון שהנך מעוניין לבצע בו את המחיקה.
      המערכת אינה מאפשרת מצב בו הוצאות חודשיות מקושרות לסעיף מסכם שאינו קיים יותר בטבלת מעקב ביצוע מול תקציב.
      להמשך המחיקה, לחץ המשך.
      `}
      {...props}
    />
  );
}
