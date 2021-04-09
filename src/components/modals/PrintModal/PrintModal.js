import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import usePrint from '../../../customHooks/usePrint';
import { useDispatch } from 'react-redux';
import { setPrintMode } from '../../../redux/actions/printActions';
import Sidebar from './Sidebar';
import Content from './Content';
import Container from './Container';

const PrintModal = props => {
  const {
    onClose,
    pageSetup
  } = props;

  const [generating, output] = usePrint(pageSetup);

  const [open, setOpen] = useState(true);

  const [pdf, setPdf] = useState(null);

  const dispatch = useDispatch();

  const onClick = () => {
    setOpen(false);
    onClose();
  }

  useEffect(() => {
    if (output !== null) {
      setPdf(output);
    }
  }, [output]);

  useEffect(() => {
    if (!generating)
      dispatch(setPrintMode(false));

  }, [dispatch, generating]);

  return <Modal
    onClose={onClick}
    open={open}
    disableBackdropClick={true}
    id="printModal"
  >

    <Container>
      <Sidebar pdf={pdf} onClose={onClick} onPrint={() => { }} />

      <Content
        loading={generating || pdf === null}
        blob={pdf !== null ? pdf.blobUrl : ""}
      />
    </Container>

  </Modal >;
}

export default PrintModal;