import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { playSound, soundTypes } from '../../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

import Section from '../../Section/Section';

import EditModal from '../modalTypes/EditModal';

import styles from './EditVatModal.module.css';
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import generalSettingsActions from '../../../redux/actions/generalSettingsActions';

export default props => {

  const data = useSelector(store => store.generalSettings.generalSettings.data);

  const [vat, setVat] = useState(data[0].tax);

  const [valid, setValid] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (vat > 100 || vat < 1) {
      //send the error to the notification center
      toast.error('מע"מ יכול להיות בין 1 ל- 100 בלבד.', {
        onOpen: () => playSound(soundTypes.error)
      });

      setValid(false);
    } else
      setValid(true);


  }, [vat])

  const formOnChange = (event) => {
    let target = event.target;
    const value = target.type === "number" && target.value === "" ? 0 : target.value;

    setVat(target.type === "number" ? parseFloat(value) : value);
  }

  const saveSettings = (event) => {
    const params = {
      id: data[0].id,
      settings: {
        tax: Number.parseFloat(vat)
      }
    };
    dispatch(generalSettingsActions.updateVat(params));
  }

  return (
    <EditModal
      style={{ width: "400px" }}
      title={'שינוי מע"מ'}
      onAgreeHandler={saveSettings}
      valid={valid}
      {...props}
    >
      <Section>
        <form className={styles.form} style={{ width: "400px" }} onChange={(event) => formOnChange(event)} onSubmit={(event) => event.preventDefault()}>
          <label>מע"מ:</label>
          <TextField
            name="vat"
            type="number"
            autoFocus
            value={vat}
            classes={{ root: styles.textField }}
            onClick={(event => event.target.select())}
            inputProps={{ min: 0, max: 100 }}
          />
        </form>
      </Section>
    </EditModal>
  );
}
