import React from 'react';
import React from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import { css } from 'emotion';
import PrimaryButton from './PrimaryButton';

const _container = css`
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  margin-left: 5px;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: initial;
  width: 40px;
  height: 40px;
  border-radius: 3px;
`;

const _icon = css`
  color: #ffffff;
  font-size: 24px;
`;

const ExcelButton = (props) => <PrimaryButton
  className={pageControlsButton}
  onClick={onClick}
>
  <RiFileExcel2Line className={_icon} />
</PrimaryButton>;

export default ExcelButton;