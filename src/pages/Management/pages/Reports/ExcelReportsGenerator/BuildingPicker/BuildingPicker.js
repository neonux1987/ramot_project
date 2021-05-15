// LIBRARIES
import React from 'react';
import ExcelReportsCheckbox from '../../../../../../components/Checkboxes/ExcelReportsCheckbox';
import VerticalDivider from '../../../../../../components/Divider/VerticalDivider';
import BuildingPickerWrapper from './BuildingPickerWrapper';

const BuildingPicker = ({ checkedBuildings, isAllChecked, setAllChecked, checkBuilding, checkboxColor }) => {

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
      <ExcelReportsCheckbox
        label="בחר הכל"
        name="all"
        checked={isAllChecked}
        onChange={onChange}
      />
      <VerticalDivider />
      {
        checkedBuildings.map(({ buildingName, buildingId, isChecked }) => {
          return <ExcelReportsCheckbox
            label={buildingName}
            key={buildingId}
            checked={isChecked}
            name={buildingId}
            onChange={onChange}
            color={checkboxColor}
          />;
        })
      }
    </BuildingPickerWrapper>
  )
}

export default BuildingPicker;