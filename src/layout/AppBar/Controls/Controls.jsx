import React from "react";
import { css } from "emotion";
import { Icon } from "@iconify/react";
import SpinningButton from "../../../components/buttons/SpinningButton/SpinningButton";
import VolumeButton from "../Controls/VolumeButton/VolumeButton";
import useIcons from "../../../customHooks/useIcons";

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: relative;
  margin-left: 15px;
`;

const volumeBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #8c49d6;
  color: #000000; */
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  color: #000000;
  min-width: 0;

  -webkit-app-region: no-drag;
  -webkit-user-select: none;
`;

const settingsBtn = css`
  margin: 0 10px;
  -webkit-app-region: no-drag;
  color: #000000 !important;
`;

const Controls = ({ routes }) => {
  const [generateIcon] = useIcons();
  const SettingsIcon = generateIcon("settings");
  return (
    <div className={container}>
      <SpinningButton
        className={settingsBtn}
        Icon={SettingsIcon}
        to={{
          pathname: `/הגדרות/כללי`,
          state: {
            page: "כללי",
            buildingName: "הגדרות",
            buildingId: "settings",
          },
        }}
        active={routes.active.state.buildingName === "הגדרות"}
      />

      <VolumeButton className={volumeBtn} />
    </div>
  );
};

export default Controls;
