import React from "react";
import SquareButton from "./SquareButton";
import ExitFullscreenIcon from "../Icons/ExitFullscreenIcon";
import EnterFullscreenIcon from "../Icons/EnterFullscreenIcon";

const FullScreenButton = ({ isFullscreen, onClick }) => {
  const Icon = isFullscreen ? ExitFullscreenIcon : EnterFullscreenIcon;
  return (
    <SquareButton Icon={Icon} onClick={onClick} iconColor="#ffffff" withHover />
  );
};

export default FullScreenButton;
