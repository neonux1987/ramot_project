import React from "react";
import { css } from "emotion";

const container = css`
  position: absolute;
  font-weight: 600;
  font-size: 14px;
  top: 95px;
  right: 25px;
`;

const EditModeStatus = ({ editMode }) => {
  const statusLabel = editMode ? "פעיל" : "כבוי";

  return (
    <>
      {editMode !== undefined ? (
        <div className={container}>
          <span>מצב עריכה: </span>
          <span
            className={css`
              background-color: ${editMode ? "green" : "red"};
              color: #ffffff;
              padding: 2px 8px;
              border-radius: 6px;
            `}
          >
            {statusLabel}
          </span>
        </div>
      ) : null}
    </>
  );
};

export default EditModeStatus;