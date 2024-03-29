// LIBRARIES
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import EmptyReportsGenerator from "./EmptyReportsGenerator";
import StyledSection from "../../../../../components/Section/StyledSection";
import BuildingPicker from "../ExcelReportsGenerator/BuildingPicker/BuildingPicker";
import Helper from "../../../../../helpers/Helper";
import { generateEmptyReports } from "../../../../../services/emptyReportsGenerator.svc";
import {
  checkBuilding,
  setAllChecked
} from "../../../../../redux/actions/reportsActions";
import CheckboxWithLabel from "../../../../../components/Checkboxes/CheckboxWithLabel";
import Box from "@material-ui/core/Box";
import DescriptionIcon from "../../../../../components/Icons/DescriptionIcon";

const years = generateYears(new Date().getFullYear());
const quarters = Helper.getYearQuarters();

const EmptyReportsGeneratorContainer = ({ emptyReports, isFetching }) => {
  const date = new Date(); //current date

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
  };

  const onClickHandler = async () => {
    const newDate = {
      year: selectDate.year,
      quarter: selectDate.quarter,
      quarterHeb: Helper.getQuarterHeb(selectDate.quarter),
      quarterEng: Helper.convertQuarterToEng(selectDate.quarter)
    };

    // keep only the selected buildings
    const filteredBuildings = checkedBuildings.filter(
      (building) => building.isChecked === true
    );

    generateEmptyReports({
      date: newDate,
      buildings: filteredBuildings,
      fromPreviousReports
    });
  };

  const setAllCheckedHandler = useCallback(
    (checked, checkedBuildings) => {
      dispatch(setAllChecked("emptyReports", checked, checkedBuildings));
    },
    [dispatch]
  );

  const checkBuildingHandler = useCallback(
    (name, checked, checkedBuildings) => {
      dispatch(checkBuilding("emptyReports", name, checked, checkedBuildings));
    },
    [dispatch]
  );

  const onCheckedHandler = useCallback((event) => {
    setFromPreviousReports(event.target.checked);
  }, []);

  return (
    <StyledSection
      title={"הפקת דוחות ריקים - רבעוניים"}
      Icon={DescriptionIcon}
      loading={isFetching}
      noData={!isFetching & (checkedBuildings.length === 0)}
      noDataText="לא קיימים בניינים"
    >
      <Box margin="0 0 0 -5px">
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
      </Box>

      <Box margin="0 20px 50px">
        <EmptyReportsGenerator
          selectDate={selectDate}
          years={years}
          quarters={quarters}
          onChangeHandler={onChangeHandler}
          onClickHandler={onClickHandler}
        />
      </Box>
    </StyledSection>
  );
};

function generateYears(currentYear) {
  const arr = [];
  const backToYearLimit = currentYear - 5;
  for (let i = currentYear; i > backToYearLimit; i--) arr.push(i);

  return arr;
}

export default React.memo(EmptyReportsGeneratorContainer);
