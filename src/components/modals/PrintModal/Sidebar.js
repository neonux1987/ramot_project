import React from 'react';
import { css } from 'emotion';
import PrimaryButton from '../../buttons/PrimaryButton';
import { Typography } from '@material-ui/core';
import DefaultButton from '../../buttons/DefaultButton';

const sidebar = css`
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
  width: 350px;
  border-left: 1px solid #ececec;
  display: flex;
  flex-direction: column;
`;

const printbutton = css`margin-right: 10px`;

const buttonWrapper = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;
const headerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const titleWrapper = css`
  display: flex;
  flex-grow: 1;
  padding: 15px;
`;

const numOfSheet = css`
  padding-left: 15px;
`;

const Sidebar = props => {
  const {
    pdf,
    onClose,
    onPrint
  } = props;

  return <div className={sidebar}>

    <div className={headerWrapper}>
      <div className={titleWrapper}>
        <Typography variant="h5">הדפסה</Typography>
      </div>

      <div className={numOfSheet}>
        {pdf !== null ? <Typography variant="h6">{`${pdf.pageCount} דפי נייר`}</Typography> : null}
      </div>
    </div>

    <div className={buttonWrapper}>
      <DefaultButton onClick={onClose}>סגור</DefaultButton>
      <PrimaryButton className={printbutton} onClick={onPrint}>
        הדפס
    </PrimaryButton>
    </div>

  </div>;
}

export default Sidebar;