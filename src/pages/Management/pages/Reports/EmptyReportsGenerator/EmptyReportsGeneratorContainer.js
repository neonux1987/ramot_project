// LIBRARIES
import React, { useCallback, useState } from 'react';
import { Description } from '@material-ui/icons';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';

// COMPONENTS
import EmptyReportsGenerator from './EmptyReportsGenerator';
import StyledSection from '../../../../../components/Section/StyledSection';
import Section from '../../../../../components/Section/Section';
import BuildingPicker from '../ExcelReportsGenerator/BuildingPicker/BuildingPicker';

// UTILS
import Helper from '../../../../../helpers/Helper';

// SERVICES
import { generateEmptyReports } from '../../../../../services/emptyReportsGenerator.svc';

// ACTIONS
import { checkBuilding, setAllChecked } from '../../../../../redux/actions/reportsActions';
import CheckboxWithLabel from '../../../../../components/Checkboxes/CheckboxWithLabel';

const years = generateYears(new Date().getFullYear());
const quarters = Helper.getYearQuarters();

const EmptyReportsGeneratorContainer = ({ emptyReports, isFetching }) => {
  const date = new Date();//current date

  const { checkedBuildings, isAllChecked } = emptyReports;

  const dispatch = useDispatch();

  const [selectDate, setSelectDate] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
    quarter: Helper.getCurrentQuarter()
  });

  const [fromPreviousReports, setFromPreviousReports] = useState(true);

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

    generateEmptyReports({ date: newDate, buildings: filteredBuildings, fromPreviousReports });
  }

  const setAllCheckedHandler = useCallback((checked, checkedBuildings) => {
    dispatch(setAllChecked("emptyReports", checked, checkedBuildings));
  }, [dispatch]);

  const checkBuildingHandler = useCallback((name, checked, checkedBuildings) => {
    dispatch(checkBuilding("emptyReports", name, checked, checkedBuildings));
  }, [dispatch]);

  const onCheckedHandler = useCallback(event => {
    setFromPreviousReports(event.target.checked);
  }, [dispatch]);

  return (
    <StyledSection
      title={"הפקת דוחות ריקים - רבעוניים"}
      Icon={Description}
      loading={isFetching}
      noData={!isFetching & checkedBuildings.length === 0}
      noDataText="לא קיימים בניינים"
    >
      <BuildingPicker
        checkedBuildings={checkedBuildings}
        isAllChecked={isAllChecked}
        setAllChecked={setAllCheckedHandler}
        checkBuilding={checkBuildingHandler}
      />

      <CheckboxWithLabel
        label="צור מדוחות קודמים?"
        name="fromPreviousReports"
        checked={fromPreviousReports}
        onChange={onCheckedHandler}
        mr="9px"
        mt="10px"
      />

      <Section marginBottom="50px" marginTop="0">
        <EmptyReportsGenerator
          selectDate={selectDate}
          years={years}
          quarters={quarters}
          onChangeHandler={onChangeHandler}
          onClickHandler={onClickHandler}
        />
      </Section>
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

export default React.memo(EmptyReportsGeneratorContainer);