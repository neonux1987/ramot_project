import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Section from '../Section/Section';

import EditModal from './modalTypes/EditModal';


const GenerateReportsModal = props => {

  //const data = useSelector(store => store.generalSettings.data);

  return (
    <EditModal
      title={`הפקת דוחות לבניין ${props.buildingName}`}
      agreeBtnText="הפק דוחות"
      cancelBtnText="סגור"
    >
      <Section>
        <div>asd</div>
      </Section>
    </EditModal>
  );
}

export default GenerateReportsModal;