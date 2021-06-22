import React from 'react';
import Section from '../Section/Section';
import EditModal from './modalTypes/EditModal';
import { CirclePicker } from 'react-color';
import useBuildingColor from '../../customHooks/useBuildingColor';

const ChangeBuildingColorModal = ({ buildingName, buildingId }) => {

  const [getBuildingColor, changeBuildingColor] = useBuildingColor();
  const buildingColor = getBuildingColor(buildingId);

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
        <CirclePicker
          color={buildingColor}
          onChange={onChangeHandler}
        />

      </Section>
    </EditModal>
  );
}

export default ChangeBuildingColorModal;