import { css } from "emotion";
import React from "react";
import SettingsIcon from "../../../components/Icons/SettingsIcon";
import SpinningButton from "../../../components/buttons/SpinningButton/SpinningButton";
import VolumeButton from "../Controls/VolumeButton/VolumeButton";
import MoreMenu from "./MoreMenu/MoreMenu";

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: relative;
  margin: 10px 0;
  color: #e5e5e5 !important;
`;

const volumeBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  color: #e5e5e5;
  min-width: 0;
  margin: 0 10px;
  border-radius: 4px;
  width: 34px;
  height: 32px;

  -webkit-app-region: no-drag;
  -webkit-user-select: none;

  :hover {
    background: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(255, 255, 255, 0.25) 100%
      )
      rgb(23, 110, 193);
  }
`;

const offStyle = css`
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(255, 255, 255, 0.25) 100%
    )
    rgb(249 30 91);

  :hover {
    background: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(255, 255, 255, 0.25) 100%
      )
      rgb(249 30 91);
  }
`;

const settingsBtn = css`
  margin: 0 10px;
  -webkit-app-region: no-drag;
  color: #e5e5e5 !important;
`;

const Controls = ({ routes }) => {
  return (
    <div className={container}>
      <MoreMenu active={routes.active.state.buildingName === "ניהול"} />

      <SpinningButton
        className={settingsBtn}
        Icon={SettingsIcon}
        to={{
          pathname: `/הגדרות/כללי`,
          state: {
            page: "כללי",
            buildingName: "הגדרות",
            buildingId: "settings"
          }
        }}
        active={routes.active.state.buildingName === "הגדרות"}
      />

      <VolumeButton className={volumeBtn} offClassName={offStyle} />
    </div>
  );
};

export default Controls;
