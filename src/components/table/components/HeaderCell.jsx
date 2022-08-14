import React from "react";
import { css } from "emotion";
import Cell from "./Cell";
import TableEditIcon from "../../Icons/TableEditIcon";

const icon = css`
  margin-left: 3px;
`;

const HeaderCell = (props) => {
  return (
    <Cell className="headerCell" {...props}>
      {props.editMode ? (
        <TableEditIcon width="16px" height="16px" className={icon} />
      ) : null}
      {props.children}
    </Cell>
  );
};

export default HeaderCell;
