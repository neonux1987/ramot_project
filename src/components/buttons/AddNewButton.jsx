import React from "react";
import SlashModeButton from "./SlashModeButton";
import useIcons from "../../customHooks/useIcons";

const AddNewButton = (props) => {
  const [generateIcon] = useIcons();
  return (
    <SlashModeButton
      {...props}
      Icon={generateIcon("add")}
      iconColor="#ffffff"
    />
  );
};

export default AddNewButton;
