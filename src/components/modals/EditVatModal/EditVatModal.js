import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';

import Section from '../../Section/Section';

import EditModal from '../modalTypes/EditModal';

import styles from './EditVatModal.module.css';
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import generalSettingsActions from '../../../redux/actions/generalSettingsActions';

export default props => {

  const data = useSelector(store => store.generalSettings.generalSettings.data);

  const [state, setState] = useState({
    formInputs: {
      tax: data[0].tax
    }
  });

  const dispatch = useDispatch();

  const formOnChange = (event) => {
    let target = event.target;
    const value = target.type === "number" && target.value === "" ? 0 : target.value;
    setState(() => {
      return {
        ...state,
        formInputs: {
          ...state.formInputs,
          [target.name]: target.type === "number" ? parseFloat(value) : value
        }
      }
    })
  }

  const saveSettings = (event) => {
    const params = {
      id: data[0].id,
      settings: {
        tax: Number.parseFloat(state.formInputs.tax)
      }
    };
    dispatch(generalSettingsActions.updateVat(params));
  }

  return (
    <EditModal
      style={{ width: "400px" }}
      title={'שינוי מע"מ'}
      onAgreeHandler={saveSettings}
      {...props}
    >
      <Section >
        <form className={styles.form} style={{ width: "400px" }} onChange={(event) => formOnChange(event)} onSubmit={(event) => event.preventDefault()}>
          <label>מע"מ:</label>
          <TextField
            name="tax"
            type="number"
            autoFocus
            min="1"
            max="100"
            value={state.formInputs.tax}
            classes={{ root: styles.textField }}
            onClick={(event => event.target.select())}
            InputProps={{ min: 0, max: 100 }}
          />
        </form>
      </Section>
    </EditModal>
  );
}
