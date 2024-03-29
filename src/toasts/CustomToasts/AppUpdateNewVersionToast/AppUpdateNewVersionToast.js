import React from 'react';
import { container, button } from './AppUpdateNewVersionToast.module.css';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { NavLink } from 'react-router-dom';

const AppUpdateNewVersionToast = ({ version, closeToast }) => {
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
            buildingId: "settings"
          }
        }}
        onClick={() => {
          closeToast();
        }}
      >עבור</PrimaryButton>

    </div>
  );
}

export default AppUpdateNewVersionToast;