import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import usePrint from '../../../customHooks/usePrint';
import { useDispatch, useSelector } from 'react-redux';
import { getPrinters, setPrintMode } from '../../../redux/actions/printActions';
import Sidebar from './layout/Sidebar/Sidebar';
import Content from './layout/Content/Content';
import Container from './Container';

const PrintModal = props => {
  const {
    onClose,
    pageSetup,
    pageName
  } = props;

  const { printers, templates } = useSelector(store => store.print);
  const [generating, output, preview] = usePrint(templates[pageName]);

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

  useEffect(() => {
    dispatch(getPrinters());
  }, [dispatch]);

  const onPrint = (printer, colors, orientation, pages) => {

  }

  return <Modal
    onClose={onClick}
    open={open}
    disableBackdropClick={true}
    id="printModal"
  >

    <Container>
      <Sidebar
        pdf={pdf}
        onClose={onClick}
        onPrint={onPrint}
        printers={printers}
        preview={preview}
      />

      <Content
        loading={generating || pdf === null}
        blob={pdf !== null ? pdf.blobUrl : ""}
      />
    </Container>

  </Modal >;
}

export default PrintModal;