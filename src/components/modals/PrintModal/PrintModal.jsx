import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setPrintMode, setOutput } from "../../../redux/actions/printActions";
import SidebarContainer from "./layout/Sidebar/SidebarContainer";
import Content from "./layout/Content/Content";
import Container from "./Container";

const PrintModal = (props) => {
  const { onClose, pageName } = props;

  const { printers, printableComponentRef, output } = useSelector(
    (store) => store.print
  );

  // using this make it look like closing
  // the modal is faster since we're using
  // modal open prop to hide it on close too
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const onClick = () => {
    setOpen(false);
    dispatch(setPrintMode(false));
    onClose();
  };

  useEffect(() => {
    return dispatch(setOutput(null));
  }, [dispatch]);

  return (
    <Modal
      onClose={onClick}
      open={open}
      disableBackdropClick={true}
      id="printModal"
    >
      <Container>
        <SidebarContainer
          pageName={pageName}
          pdf={output}
          onClose={onClick}
          printers={printers}
        />

        <Content
          loading={printableComponentRef === null || output === null}
          blob={output !== null ? output.blobUrl : ""}
          output={output}
        />
      </Container>
    </Modal>
  );
};

export default React.memo(PrintModal);
