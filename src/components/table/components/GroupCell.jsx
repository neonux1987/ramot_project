import { css } from 'emotion';
import React from 'react';
import Cell from './Cell';
import useIcons from '../../../customHooks/useIcons';

const markerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const GroupCell = ({ color = "#000000", span = 1, children }) => {
  const [generateIcon] = useIcons();
  const CalendarIcon = generateIcon("calendar");
  return <Cell
    className="groupCell"
    style={{
      gridColumn: `span ${span}`
    }}
  >
    <div className={markerWrapper}>
      {color !== "#000000" && <CalendarIcon style={{ color: color === "#000000" ? "initial" : color }} />}
    </div>
    {children}
  </Cell>
}

export default GroupCell;