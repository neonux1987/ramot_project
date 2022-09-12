import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Helper from "../../../../../helpers/Helper";
import { exportReports } from "../../../../../services/reports.svc";
import {
  fetchRegisteredReportsGroupedByYear,
  fetchRegisteredReportsByYear
} from "../../../../../redux/actions/registeredReportsActions";
import {
  checkBuilding,
  setAllChecked
} from "../../../../../redux/actions/reportsActions";
import StyledSection from "../../../../../components/Section/StyledSection";
import ExcelReportsGenerator from "./ExcelReportsGenerator";
import BuildingPicker from "./BuildingPicker/BuildingPicker";
import Box from "@material-ui/core/Box";
import ExcelIcon from "../../../../../components/Icons/ExcelIcon";
import useIsMounted from "../../../../../customHooks/useIsMounted";

const ExcelReportsGeneratorContainer = ({ excelReports, isFetching }) => {
  const date = new Date(); //current date

  const [year, setYear] = useState(date.getFullYear());
  const [quarter, setQuarter] = useState(
    Helper.getCurrentQuarter(date.getMonth())
  );

  const isMounted = useIsMounted();

  const { checkedBuildings, isAllChecked } = excelReports;

  const dispatch = useDispatch();

  const [quarters, setQuarters] = useState([]);
  const registeredReports = useSelector((store) => store.registeredReports);

  useEffect(() => {
    if (isMounted()) {
      dispatch(fetchRegisteredReportsGroupedByYear()).then((result) => {
        const yearsData = result.data;

        if (yearsData.length > 0) {
          const lastYear = yearsData[0].year;
          setYear(() => lastYear);

          dispatch(fetchRegisteredReportsByYear(lastYear)).then(({ data }) => {
            if (data.length > 0)
              setQuarters(() => {
                setQuarter(() => data[0].quarter);
                return data;
              });
          });
        }
      });
    }
  }, [dispatch, isMounted]);

  const onYearChangeHandler = (event) => {
    if (isMounted()) {
      const { value } = event.target;
      setYear(value);

      dispatch(fetchRegisteredReportsByYear(value)).then(({ data }) => {
        if (data.length > 0)
          setQuarters(() => {
            setQuarter(() => data[0].quarter);
            return data;
          });
      }); // end dispatch
    }
  };

  const onQuarterChangeHandler = (event) => {
    const { value } = event.target;
    setQuarter(value);
  };

  const onClickHandler = () => {
    const newDate = {
      year,
      quarter,
      quarterHeb: Helper.getQuarterHeb(quarter),
      quarterEng: Helper.convertQuarterToEng(quarter)
    };
    // keep only the selected buildings
    const filteredBuildings = checkedBuildings.filter(
      (building) => building.isChecked === true
    );

    exportReports(newDate, filteredBuildings);
  };

  const setAllCheckedHandler = useCallback(
    (checked, checkedBuildings) => {
      dispatch(setAllChecked("excelReports", checked, checkedBuildings));
    },
    [dispatch]
  );

  const checkBuildingHandler = useCallback(
    (name, checked, checkedBuildings) => {
      dispatch(checkBuilding("excelReports", name, checked, checkedBuildings));
    },
    [dispatch]
  );

  return (
    <StyledSection
      title={"הפקת דוחות אקסל"}
      Icon={ExcelIcon}
      bgColor="#1ead82"
      padding={"30px 20px 50px"}
      loading={
        isFetching ||
        (registeredReports.isFetching && registeredReports.data.length === 0)
      }
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
      </Box>
      <Box margin="30px 15px 50px">
        <ExcelReportsGenerator
          year={year}
          quarter={quarter}
          quarters={quarters}
          registeredReports={registeredReports}
          onClickHandler={onClickHandler}
          onQuarterChangeHandler={onQuarterChangeHandler}
          onYearChangeHandler={onYearChangeHandler}
        />
      </Box>
    </StyledSection>
  );
};

export default ExcelReportsGeneratorContainer;
