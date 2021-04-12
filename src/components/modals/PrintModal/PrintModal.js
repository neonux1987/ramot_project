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
    pageName
  } = props;

  const { printers } = useSelector(store => store.print);
  const [generating, output, generate, print] = usePrint(pageName);

  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const onClick = () => {
    setOpen(false);
    onClose();
  }

  useEffect(() => {
    return () => {
      dispatch(setPrintMode(false));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPrinters());
  }, [dispatch]);

  return <Modal
    onClose={onClick}
    open={open}
    disableBackdropClick={true}
    id="printModal"
  >

    <Container>
      <Sidebar
        pageName={pageName}
        pdf={output}
        onClose={onClick}
        onPrint={print}
        printers={printers}
        generate={generate}
      />

      <Content
        loading={generating || output === null}
        blob={output !== null ? output.blobUrl : ""}
        output={output}
      />
    </Container>

  </Modal >;
}

export default React.memo(PrintModal);