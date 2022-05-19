import { css } from 'emotion';
import React from 'react';
import Cell from './Cell';
import { Icon } from '@iconify/react';

const markerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const marker = css`
  width: 12px;
  height: 12px;
  border-radius: 10px;
`;

const GroupCell = ({ color = "#000000", span = 1, children }) => {
  return <Cell
    className="groupCell"
    style={{
      gridColumn: `span ${span}`
    }}
  >
    <div className={markerWrapper}>
      {color !== "#000000" && <Icon icon="mdi:calendar-month-outline" width="24" height="24" style={{ color: color === "#000000" ? "initial" : color }} />}
    </div>
    {children}
  </Cell>
}

export default GroupCell;