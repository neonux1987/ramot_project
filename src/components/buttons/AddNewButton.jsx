import React from "react";
import SlashModeButton from "./SlashModeButton";
import AddIcon from "../Icons/AddIcon";

const AddNewButton = (props) => (
  <SlashModeButton {...props} Icon={AddIcon} iconColor="#ffffff" />
);

export default AddNewButton;
