import React, { useState, useEffect, useRef, useCallback } from 'react';
import { css } from 'emotion';
import PrimaryButton from '../../buttons/PrimaryButton';
import { Typography, Modal } from '@material-ui/core';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';
import CloseButton from '../../buttons/CloseButton';
import { print } from '../../../services/print.svc';

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
  border-radius: 3px;
  outline: none;
  -webkit-app-region: no-drag;
`;

const headerContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
  padding: 15px 0;
`;

const printbutton = css`margin-right: 10px`;

const buttonWrapper = css`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  padding-left: 5px;
`;

const titleWrapper = css`
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex: 1;
  padding-right: 15px;
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
  visibillity: hidden;
`;

const tableHeaderContainer = css`
  margin-bottom: 10px;
`;

const tableHeaderDate = css`
  font-size: 16px;
`;

const PrintModal = props => {
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

  const [ref, setRef] = useState(null);

  const [generating, setGenerating] = useState(true);

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
    onPrint();
  }, [ref, onPrint]);

  const onRefSet = useCallback(ref => {
    console.log(ref);
    setRef(ref);
  }, []);

  const onPrint = useCallback(() => {

    if (ref !== null) {
      const element = document.getElementById("print-table");
      print(element).then(() => {
        setGenerating(false);
        //ref.innerHTML = "";
        //ref.appendChild("hello");
      });

    }


  }, [ref]);

  return (
    <Modal BackdropProps={{ className: backDropOverride }} onClose={onClick} open={open}>

      <div className={container}>

        <div className={headerContainer}>

          <div className={titleWrapper}>
            <Typography variant="h5">תצוגה לפני הדפסה</Typography>
            <PrimaryButton className={printbutton} onClick={() => { }}>
              הדפס
            </PrimaryButton>
          </div>

          <div className={buttonWrapper}>
            <CloseButton onClick={onClick} />
          </div>

        </div>

        {generating ? <AlignCenterMiddle style={{ display: generating ? "flex" : "none" }}>מייצר תצוגה...</AlignCenterMiddle> : null}

        <div id="print-table" ref={onRefSet} className={tableRefWrapper} style={{ visibility: generating ? "hidden" : "visible" }}>
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
    </Modal >
  );
}

export default PrintModal;