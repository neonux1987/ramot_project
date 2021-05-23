import React from 'react';

import WarningModal from '../modalTypes/WarningModal';

const ConfirmBuildingsDeletion = props => {
  const buildingsForDeletion = props.buildingsForDeletion;

  const buildingNames = buildingsForDeletion.map(({ buildingName }) => {
    return buildingName;
  });

  return (
    <WarningModal
      contentText={`
      הבניינים '${buildingNames}' הועברו לססטוס מחיקה לפני 30 יום או יותר.
      האם למחוק אותם לצמיתות?
      `}
      {...props}
    />
  );
}

export default ConfirmBuildingsDeletion;