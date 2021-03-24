// LIBRARIES
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExcelReportsCheckbox from '../../../../../../components/Checkboxes/ExcelReportsCheckbox';
import { setAll, updateCheckedBuilding } from '../../../../../../redux/actions/reportsActions';
import BuildingPickerWrapper from './BuildingPickerWrapper';

const BuildingPicker = () => {

  const { chosenBuildings, all } = useSelector(store => store.reports.excelReports);
  const reports = useSelector(store => store.reports.excelReports);
  const dispatch = useDispatch();

  const onChange = (event) => {
    const target = event.target;
    const { name, checked } = target;

    if (name === "all")
      dispatch(setAll(checked));
    else
      dispatch(updateCheckedBuilding(name, checked));
  }

  const checkboxes = () => {
    const keys = Object.keys(chosenBuildings);

    const render = keys.map(name => {

      const { buildingName, buildingNameEng, checked } = chosenBuildings[name];

      return <ExcelReportsCheckbox
        label={buildingName}
        key={buildingNameEng}
        checked={checked}
        disabled={all ? true : false}
        name={buildingNameEng}
        onChange={onChange}
      />;
    });

    return render;
  }

  return (
    <BuildingPickerWrapper>
      {checkboxes()}
      <ExcelReportsCheckbox
        label="הכל"
        name="all"
        checked={all}
        onChange={onChange}
      />
    </BuildingPickerWrapper>
  )
}

export default React.memo(BuildingPicker);