import React, { useState } from 'react';
import { soundManager } from '../../../soundManager/SoundManager';
import { toast } from 'react-toastify';
import Section from '../../Section/Section';
import EditModal from '../modalTypes/EditModal';
import { useSelector, useDispatch } from 'react-redux';
import generalSettingsActions from '../../../redux/actions/generalSettingsActions';
import EditVatForm from '../../EditVatForm/EditVatForm';

const { play, types } = soundManager;

const EditVatModal = props => {

  const data = useSelector(store => store.generalSettings.data);

  const [vat, setVat] = useState(data[0].tax);

  const [valid, setValid] = useState(true);

  const dispatch = useDispatch();

  const formOnChange = (event) => {
    let target = event.target;
    const value = target.type === "number" && target.value === "" ? 0 : target.value;

    setVat(target.type === "number" ? parseFloat(value) : value);
  }

  const saveSettings = () => {

    if (vat > 100 || vat < 1) {
      //send the error to the notification center
      toast.error('מע"מ יכול להיות בין 1 ל- 100 בלבד.', {
        onOpen: () => play(types.error)
      });

      setValid(false);
    } else {
      setValid(true);

      const params = {
        id: data[0].id,
        settings: {
          tax: Number.parseFloat(vat)
        }
      };
      dispatch(generalSettingsActions.updateVat(params));
    }

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
        <EditVatForm
          onChange={formOnChange}
          value={vat}
        />
      </Section>
    </EditModal>
  );
}

export default EditVatModal;