// LIBRARIES
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiFileExcel2Line } from 'react-icons/ri';

// UTILS
import Helper from '../../../../../helpers/Helper';

// SERVICES
import { exportReports } from '../../../../../services/reports.svc';

// ACTIONS
import { fetchRegisteredReportsGroupedByYear, fetchRegisteredReportsByYear } from '../../../../../redux/actions/registeredReportsActions';
import { checkBuilding, setAllChecked } from '../../../../../redux/actions/reportsActions';

// COMPONENTS
import StyledSection from '../../../../../components/Section/StyledSection';
import ExcelReportsGenerator from './ExcelReportsGenerator';
import BuildingPicker from './BuildingPicker/BuildingPicker';
import Section from '../../../../../components/Section/Section';

const ExcelReportsGeneratorContainer = ({ excelReports, isFetching }) => {
  const date = new Date();//current date

  const [year, setYear] = useState(date.getFullYear());
  const [quarter, setQuarter] = useState(Helper.getCurrentQuarter(date.getMonth()));

  const { checkedBuildings, isAllChecked } = excelReports;

  const dispatch = useDispatch();

  const [quarters, setQuarters] = useState([]);
  const registeredReports = useSelector(store => store.registeredReports);

  useEffect(() => {
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
        }); // end dispatch

      } // end if

    }); // end dispatch

  }, [dispatch]);

  const onYearChangeHandler = (event) => {
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

  const onQuarterChangeHandler = (event) => {
    const { value } = event.target;
    setQuarter(value);
  }

  const onClickHandler = () => {
    const newDate = {
      year,
      quarter,
      quarterHeb: Helper.getQuarterHeb(quarter),
      quarterEng: Helper.convertQuarterToEng(quarter)
    }
    // keep only the selected buildings
    const filteredBuildings = checkedBuildings.filter(building => building.isChecked === true);

    exportReports(newDate, filteredBuildings);
  }

  const setAllCheckedHandler = useCallback((checked, checkedBuildings) => {
    dispatch(setAllChecked("excel", checked, checkedBuildings));
  }, [dispatch]);

  const checkBuildingHandler = useCallback((name, checked, checkedBuildings) => {
    dispatch(checkBuilding("excel", name, checked, checkedBuildings));
  }, [dispatch]);

  return (
    <StyledSection
      title={"הפקת דוחות אקסל"}
      Icon={RiFileExcel2Line}
      bgColor="#1ead82"
      padding={"30px 20px 50px"}
      loading={isFetching || (registeredReports.isFetching && registeredReports.data.length === 0)}
    >
      <BuildingPicker
        checkedBuildings={checkedBuildings}
        isAllChecked={isAllChecked}
        setAllChecked={setAllCheckedHandler}
        checkBuilding={checkBuildingHandler}
      />
      <Section marginBottom="50px">
        <ExcelReportsGenerator
          year={year}
          quarter={quarter}
          quarters={quarters}
          registeredReports={registeredReports}
          onClickHandler={onClickHandler}
          onQuarterChangeHandler={onQuarterChangeHandler}
          onYearChangeHandler={onYearChangeHandler}
        />
      </Section>

    </StyledSection>
  )
}

export default ExcelReportsGeneratorContainer;