import React from "react";

import WarningModal from "../modalTypes/WarningModal";

const ConfirmBackupsRestore = (props) => {
  return (
    <WarningModal
      id={ConfirmBackupsRestore}
      contentText={`
      המערכת זיהתה גיבויים קודמים בתיקיית הגיבויים:
      ${JSON.stringify(props.data, null, "\t").replace(/[[\]']+/g, "")}
      האם להוסיף אותם לרשימת הגיבויים במערכת?
      `}
      {...props}
    />
  );
};

export default ConfirmBackupsRestore;
