import React from "react";
import { useSelector } from "react-redux";

const ModalRoot = () => {
  const { modals } = useSelector((store) => store.modal);

  return modals.map(({ ModalComponent, props }) => (
    <ModalComponent {...props} key={ModalComponent.name} />
  ));
};

export default ModalRoot;
