import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { css } from 'emotion';

const form = css`
  width: 400px;
  padding-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const label = css`
margin-left: 10px;
font-weight: 600;
font-size: 16px;
`;

const textField = css`
  width: 160px;
`;

const EditVatForm = ({ value, onChange }) => {

  return (
    <form className={form} onChange={onChange} onSubmit={(event) => event.preventDefault()}>
      <label className={label}>מע"מ:</label>
      <TextField
        name="vat"
        type="number"
        autoFocus
        value={value}
        classes={{ root: textField }}
        onClick={(event => event.target.select())}
        inputProps={{ min: 0, max: 100 }}
      />
    </form>
  );
}

export default EditVatForm;