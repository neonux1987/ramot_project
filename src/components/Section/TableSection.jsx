import React from "react";
import EditModeStatus from "../EditModeStatus/EditModeStatus";
import SavedNotification from "../SavedNotification/SavedNotification";
import SectionWithHeader from "./SectionWithHeader";

const TableSection = (props) => {
  return (
    <SectionWithHeader {...props} id="tableSection">
      <EditModeStatus editMode={props.editMode} />
      {props.children}
      <SavedNotification />
    </SectionWithHeader>
  );
};

export default React.memo(TableSection);
