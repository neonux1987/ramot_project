// LIBRARIES
import React, { useCallback, useState } from 'react';
import { Description } from '@material-ui/icons';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import EmptyReportsGenerator from './EmptyReportsGenerator';
import StyledSection from '../../../../../components/Section/StyledSection';
import BuildingPicker from '../ExcelReportsGenerator/BuildingPicker/BuildingPicker';

// UTILS
import Helper from '../../../../../helpers/Helper';

// SERVICES
import { generateEmptyReports } from '../../../../../services/emptyReportsGenerator.svc';

// ACTIONS
import { checkBuilding, setAllChecked } from '../../../../../redux/actions/reportsActions';

const years = generateYears(new Date().getFullYear());
const quarters = Helper.getYearQuarters();

const EmptyReportsGeneratorContainer = () => {
  const date = new Date();//current date

  const { checkedBuildings, isAllChecked } = useSelector(store => store.reports.emptyReports);

  const dispatch = useDispatch();

  const [selectDate, setSelectDate] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
    quarter: Helper.getCurrentQuarter()
  });

  // default on change handler
  // for months and quarters
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setSelectDate({
      ...selectDate,
      [name]: Number.parseInt(value)
    });
  }

  const onClickHandler = async () => {
    const newDate = {
      year: selectDate.year,
      quarter: selectDate.quarter,
      quarterHeb: Helper.getQuarterHeb(selectDate.quarter),
      quarterEng: Helper.convertQuarterToEng(selectDate.quarter)
    }

    // keep only the selected buildings
    const filteredBuildings = checkedBuildings.filter(building => building.isChecked === true);

    generateEmptyReports(newDate, filteredBuildings);
  }

  const setAllCheckedHandler = useCallback((checked, checkedBuildings) => {
    dispatch(setAllChecked("empty", checked, checkedBuildings));
  }, [dispatch]);

  const checkBuildingHandler = useCallback((name, checked, checkedBuildings) => {
    dispatch(checkBuilding("empty", name, checked, checkedBuildings));
  }, [dispatch]);

  return (
    <StyledSection
      title={"הפקת דוחות ריקים - רבעוניים"}
      Icon={Description}
    >
      <BuildingPicker
        checkedBuildings={checkedBuildings}
        isAllChecked={isAllChecked}
        setAllChecked={setAllCheckedHandler}
        checkBuilding={checkBuildingHandler}
      />

      <EmptyReportsGenerator
        selectDate={selectDate}
        years={years}
        quarters={quarters}
        onChangeHandler={onChangeHandler}
        onClickHandler={onClickHandler}
      />
    </StyledSection>
  )
};

function generateYears(currentYear) {
  const arr = [];
  const backToYearLimit = currentYear - 5;
  for (let i = currentYear; i > backToYearLimit; i--)
    arr.push(i);

  return arr;
}

export default withRouter(EmptyReportsGeneratorContainer);