import React from "react";
import { css } from "emotion";
import SpinningButton from "../../../components/buttons/SpinningButton/SpinningButton";
import VolumeButton from "../Controls/VolumeButton/VolumeButton";
import MoreMenu from "./MoreMenu/MoreMenu";
import SettingsIcon from "../../../components/Icons/SettingsIcon";

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: relative;
  margin: 10px 0;
`;

const volumeBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  color: #ffffff;
  min-width: 0;
  box-shadow: rgba(0, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem;
  margin: 0 10px;
  border-radius: 4px;
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(255, 255, 255, 0.25) 100%
    )
    rgb(23, 110, 193);

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
  color: #000000 !important;
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
