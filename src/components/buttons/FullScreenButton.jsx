import React from "react";
import SquareButton from "./SquareButton";
import useIcons from "../../customHooks/useIcons";

const FullScreenButton = ({ isFullscreen, onClick }) => {
  const [generateIcon] = useIcons();
  const Icon = isFullscreen
    ? generateIcon("fullscreen-exit")
    : generateIcon("fullscreen");
  return <SquareButton Icon={Icon} onClick={onClick} iconColor="#ffffff" />;
};

export default FullScreenButton;
