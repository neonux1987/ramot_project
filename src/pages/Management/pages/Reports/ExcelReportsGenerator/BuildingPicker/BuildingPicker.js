// LIBRARIES
import React from 'react';
import CheckboxWithLabel from '../../../../../../components/Checkboxes/CheckboxWithLabel';
import VerticalDivider from '../../../../../../components/Divider/VerticalDivider';
import BuildingPickerWrapper from './BuildingPickerWrapper';

const BuildingPicker = ({ checkedBuildings, isAllChecked, setAllChecked, checkBuilding }) => {

  const onChange = (event) => {
    const target = event.target;
    const { name, checked } = target;

    if (name === "all")
      setAllChecked(checked, checkedBuildings);
    else
      checkBuilding(name, checked, checkedBuildings);
  }

  return (
    <BuildingPickerWrapper>
      <CheckboxWithLabel
        label="בחר הכל"
        name="all"
        checked={isAllChecked}
        onChange={onChange}
      />
      <VerticalDivider />
      {
        checkedBuildings.map(({ buildingName, buildingId, isChecked }) => {
          return <CheckboxWithLabel
            label={buildingName}
            key={buildingId}
            checked={isChecked}
            name={buildingId}
            onChange={onChange}
          />;
        })
      }
    </BuildingPickerWrapper>
  )
}

export default BuildingPicker;