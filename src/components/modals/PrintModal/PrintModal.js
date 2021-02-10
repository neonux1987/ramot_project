import React, { useState, useEffect, useRef } from 'react';
import { css } from 'emotion';
import { Close } from '@material-ui/icons';
import PrimaryButton from '../../Buttons/PrimaryButton';
import ButtonWithSound from '../../../componentsWithSound/ButtonWithSound/ButtonWithSound';
import { Typography, Modal } from '@material-ui/core';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';

const container = css`
    overflow: hidden;
    z-index: 999;
    width: initial;
    margin:50px 41px 41px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    background: #fff;
    border-radius: 5px;
    outline: none;
    -webkit-app-region: no-drag;
    `;

const headerContainer = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 10px;
    padding: 15px;
    `;

const printbutton = css`margin-right: 10px`;

const buttonWrapper = css`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
`;

const closeButton = css`
min-width: initial; 
margin-left: -8px;

`
const closeButtonText = css`
font-size: 18px;
`;

const closeButtonIcon = css`
font-size: 20px;
`;

const titleWrapper = css`
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex: 1;
`;

const backDropOverride = css`
    top: 0px !important;
    -webkit-app-region: no-drag;
`;

const tableRefWrapper = css`
  overflow: overlay;
    max-height: 87%;
    padding: 15px 20px;
    margin-top: 1%;
    `;

const tableHeaderContainer = css`
      margin-bottom: 10px;
    `;

const tableHeaderDate = css`
      font-size: 16px;
    `;

export default props => {
  const {
    //title,
    pageTitle,
    onClose,
    GroupComponent,
    HeaderComponent,
    Row,
    itemCount,
    date
  } = props;

  const tableRef = useRef(null);

  const [generating, setgenerating] = useState(true);

  const [open, setOpen] = useState(true);

  const onClick = () => {
    setOpen(false);
    onClose();
  }

  const rows = [];

  for (let i = 0; i < itemCount; i++) {
    rows.push(Row(i, i));
  }

  useEffect(() => {
    setgenerating(false);
  }, []);

  return (
    <Modal BackdropProps={{ className: backDropOverride }} onClose={onClick} open={open}>

      <div className={container}>

        <div className={headerContainer}>

          <div className={titleWrapper}>
            <Typography variant="h5">תצוגה לפני הדפסה</Typography>
            <PrimaryButton className={printbutton}>
              הדפס
            </PrimaryButton>
          </div>

          <div className={buttonWrapper}>
            <ButtonWithSound onClick={onClick} className={closeButton}>
              <Close className={closeButtonIcon} />
              <span className={closeButtonText}>סגור</span>
            </ButtonWithSound>
          </div>

        </div>

        <AlignCenterMiddle style={{ display: generating ? "flex" : "none" }}>מייצר תצוגה...</AlignCenterMiddle>

        <div ref={tableRef} className={tableRefWrapper} style={{ display: generating ? "none" : "block" }}>
          <div className={tableHeaderContainer}>
            <div>
              <Typography variant="h5">{pageTitle}</Typography>
            </div>

            <div className={tableHeaderDate}>{date}</div>
          </div>

          <div className={"_table"}>

            {GroupComponent && GroupComponent()}
            {HeaderComponent && HeaderComponent()}

            <div className={"_tableBody"}>
              {rows}
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
}
