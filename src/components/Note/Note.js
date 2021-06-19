// LIBRARIES
import React from 'react';
import { css } from 'emotion';

const container = css`
  color: #555555;
  display: flex;
  font-size: 14px;
  font-family: Assistant,sans-serif;
`;

const Note = ({ text = "", important = false, margin = "0", className = "" }) => <div className={`${container} ${className}`} style={{ margin }}>
  <span className={css`color: ${important ? "red" : "inherit"}`}>*</span>
  <span>{text}</span>
</div>;

export default Note;