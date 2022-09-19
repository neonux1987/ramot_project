import React from "react";
import { css } from "emotion";
import EditModeStatus from "../../EditModeStatus/EditModeStatus";

const container = css`
  display: flex;
  flex-grow: 1;
  position: relative;
  height: 70px;
  border-bottom: 1px solid #dddddd;
`;

const childrenWrapper = css`
  flex-grow: 1;
`;

const SubSectionControls = ({ children, editMode }) => {
  return (
    <div className={container}>
      <EditModeStatus editMode={editMode} />
      <div className={childrenWrapper}>{children}</div>
    </div>
  );
};

export default SubSectionControls;
