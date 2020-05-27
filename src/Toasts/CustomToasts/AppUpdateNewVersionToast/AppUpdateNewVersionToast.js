import React from 'react';
import { container, button } from './AppUpdateNewVersionToast.module.css';
import { downloadUpdate } from '../../../services/updates.svc';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import { NavLink } from 'react-router-dom';

export default ({ version, closeToast }) => {
  return (
    <div className={container}>

      <span>{`גירסה חדשה יותר ${version} זמינה עכשיו להורדה בעמוד עדכוני תוכנה. למעבר לחץ`}</span>

      <PrimaryButton
        className={button}
        component={NavLink}
        to={{
          pathname: `/הגדרות/עדכוני תוכנה`,
          state: {
            page: "עדכוני תוכנה",
            buildingName: "הגדרות",
            buildingNameEng: "settings"
          }
        }}
        onClick={() => {
          closeToast();
        }}
      >עבור</PrimaryButton>

    </div>
  );
}