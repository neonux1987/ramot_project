import React from "react";
import EditModal from "./modalTypes/EditModal";
import { SketchPicker } from "react-color";
import useBuildingColor from "../../customHooks/useBuildingColor";
import Box from "@material-ui/core/Box";

const presetColors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b"
];

const ChangeBuildingColorModal = ({ buildingName, buildingId }) => {
  const [buildingColor, changeBuildingColor, onChangeComplete] =
    useBuildingColor(buildingId);

  const onChangeHandler = (event) => {
    changeBuildingColor(buildingId, event.hex);
  };

  const onCancelHandler = () => {
    onChangeComplete({ hex: buildingColor });
  };

  return (
    <EditModal
      title={`שנה צבע לבניין ${buildingName}`}
      hideAgreeButton={true}
      cancelBtnText="סגור"
      onCancelHandler={onCancelHandler}
      onBackdropClickHandler={onCancelHandler}
      invisibleBackdrop
      id={ChangeBuildingColorModal}
    >
      <Box
        margin="15px 60px"
        style={{ display: "flex", justifyContent: "center", margin: "0 60px" }}
      >
        <SketchPicker
          color={buildingColor}
          onChange={onChangeHandler}
          presetColors={presetColors}
        />
      </Box>
    </EditModal>
  );
};

export default ChangeBuildingColorModal;
