import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setColors, setPrintMode } from "../../../redux/actions/printActions";
import SidebarContainer from "./layout/Sidebar/SidebarContainer";
import Content from "./layout/Content/Content";
import Container from "./Container";
import usePrint from "../../../customHooks/usePrint";

const PrintModal = (props) => {
  const { onClose, pageName } = props;

  const { printers, printableComponentRef } = useSelector(
    (store) => store.print
  );

  const { generatePreview, generatingPreview, output, print } = usePrint();

  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const onClick = () => {
    setOpen(false);
    onClose();
  };

  const generate = (options) => {
    if (
      printableComponentRef !== null &&
      printableComponentRef.current !== null
    )
      generatePreview(printableComponentRef, options);
  };

  useEffect(() => {
    return () => {
      dispatch(setPrintMode(false));
      dispatch(setColors(true));
    };
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
          onPrint={print}
          printers={printers}
          generate={generate}
        />

        <Content
          loading={
            printableComponentRef === null ||
            generatingPreview ||
            output === null
          }
          blob={output !== null ? output.blobUrl : ""}
          output={output}
        />
      </Container>
    </Modal>
  );
};

export default React.memo(PrintModal);
