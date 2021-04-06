import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import PrimaryButton from '../../buttons/PrimaryButton';
import { Typography, Modal } from '@material-ui/core';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';
import DefaultButton from '../../buttons/DefaultButton';
import usePrint from '../../../customHooks/usePrint';
import { useDispatch } from 'react-redux';
import { setPrintMode } from '../../../redux/actions/printActions';

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
  display: flex;
`;

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

const titleWrapper = css`
  display: flex;
  flex-grow: 1;
  padding: 15px;
`;

const _content = css`
  margin: 0;
  flex-grow: 1;
`;

const iframeStyle = css`
width: 100%; 
height: 100%; 
border: 1px solid #ececec;
`;

const PrintModal = props => {
  const {
    onClose,
    pageSetup
  } = props;

  const [generating, output] = usePrint(pageSetup);

  const [open, setOpen] = useState(true);

  const [pdf, setPdf] = useState("");

  const dispatch = useDispatch();

  const onClick = () => {
    setOpen(false);
    onClose();
  }

  useEffect(() => {
    if (output !== null) {
      setPdf(output);
      //setPages(output.pages)
    }
  }, [output]);

  useEffect(() => {
    if (!generating)
      dispatch(setPrintMode(false));

  }, [dispatch, generating]);

  return (
    <Modal
      onClose={onClick}
      open={open}
      disableBackdropClick={true}
      id="printModal"
    >

      <div className={container}>

        <div className={sidebar}>

          <div className={titleWrapper}>
            <Typography variant="h5">הדפסה</Typography>
          </div>

          <div className={buttonWrapper}>
            <DefaultButton onClick={onClick}>סגור</DefaultButton>
            <PrimaryButton className={printbutton} onClick={() => { }}>
              הדפס
            </PrimaryButton>
          </div>

        </div>

        <div id="print-table" className={_content} /* style={{ visibility: generating ? "hidden" : "visible" }} */>

          {generating ? <AlignCenterMiddle style={{ display: generating ? "flex" : "none" }}>מייצר תצוגה...</AlignCenterMiddle> : null}

          <iframe title="print-preview" id="print-iframe" className={iframeStyle} src={pdf.blobUrl}></iframe>

        </div>

      </div>
    </Modal >
  );
}

export default PrintModal;