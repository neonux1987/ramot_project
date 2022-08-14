import React from "react";
import SlashModeButton from "./SlashModeButton";
import EditIcon from "../Icons/EditIcon";

const EditButton = (props) => (
  <SlashModeButton {...props} Icon={EditIcon} iconColor="#ffffff" />
);

export default EditButton;
