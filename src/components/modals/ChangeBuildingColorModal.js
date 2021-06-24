import React from 'react';
import Section from '../Section/Section';
import EditModal from './modalTypes/EditModal';
import { SketchPicker } from 'react-color';
import useBuildingColor from '../../customHooks/useBuildingColor';

const ChangeBuildingColorModal = ({ buildingName, buildingId }) => {

  const [buildingColor, changeBuildingColor, onChangeComplete] = useBuildingColor(buildingId);

  const onChangeHandler = event => {
    changeBuildingColor(buildingId, event.hex);
  }

  return (
    <EditModal
      title={`שנה צבע לבניין ${buildingName}`}
      hideAgreeButton={true}
      cancelBtnText="סגור"
      invisibleBackdrop
    >
      <Section marginTop="30px">
        <SketchPicker
          color={buildingColor}
          onChange={onChangeHandler}
          onChangeComplete={onChangeComplete}
        />

      </Section>
    </EditModal>
  );
}

export default ChangeBuildingColorModal;