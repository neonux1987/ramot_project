import React from "react";
import { css } from "emotion";

const _container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
`;

const FormWrapper = (props) => {
  return (
    <form id="formWrapper" className={_container}>
      {props.children}
    </form>
  );
};

export default FormWrapper;
