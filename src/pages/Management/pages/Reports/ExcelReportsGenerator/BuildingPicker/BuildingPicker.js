// LIBRARIES
import React from 'react';
import { useDispatch } from 'react-redux';
import ExcelReportsCheckbox from '../../../../../../components/Checkboxes/ExcelReportsCheckbox';
import VerticalDivider from '../../../../../../components/Divider/VerticalDivider';
import { setAllChecked, checkBuilding } from '../../../../../../redux/actions/reportsActions';
import BuildingPickerWrapper from './BuildingPickerWrapper';

const BuildingPicker = ({ checkedBuildings, isAllChecked }) => {

  const dispatch = useDispatch();

  const onChange = (event) => {
    const target = event.target;
    const { name, checked } = target;

    if (name === "all")
      dispatch(setAllChecked(checked, checkedBuildings));
    else
      dispatch(checkBuilding(name, checked, checkedBuildings));
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
        checkedBuildings.map(({ buildingName, buildingNameEng, isChecked }) => {
          return <ExcelReportsCheckbox
            label={buildingName}
            key={buildingNameEng}
            checked={isChecked}
            name={buildingNameEng}
            onChange={onChange}
          />;
        })
      }
    </BuildingPickerWrapper>
  )
}

export default BuildingPicker;