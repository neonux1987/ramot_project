import React from 'react';
import { css } from 'emotion';

const _container = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = props => {

  return (
    <form className={_container}>
      {props.children}
    </form>
  );

}

export default FormWrapper;