// LIBRARIES
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiFileExcel2Line } from 'react-icons/ri';

// UTILS
import Helper from '../../../../../helpers/Helper';

// SERVICES
import { exportToExcelBulk } from '../../../../../services/excel.svc';

// ACTIONS
import { fetchRegisteredReportsGroupedByYear, fetchRegisteredReportsByYear } from '../../../../../redux/actions/registeredReportsActions';
import StyledSection from '../../../../../components/Section/StyledSection';
import ExcelReportsGenerator from './ExcelReportsGenerator';
import BuildingPicker from './BuildingPicker/BuildingPicker';

const ExcelReportsGeneratorContainer = () => {
  const date = new Date();//current date

  const [year, setYear] = useState(date.getFullYear());
  const [quarter, setQuarter] = useState(Helper.getCurrentQuarter(date.getMonth()));

  const { checkedBuildings, isAllChecked } = useSelector(store => store.reports.excelReports);

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

    exportToExcelBulk(newDate, checkedBuildings);
  }

  return (
    <StyledSection
      title={"הפקת דוחות אקסל"}
      Icon={RiFileExcel2Line}
      padding={"30px 20px 50px"}
      bgColor={"rgb(22, 156, 144)"}
      loading={registeredReports.isFetching && registeredReports.data.length === 0}
    >
      <BuildingPicker
        checkedBuildings={checkedBuildings}
        isAllChecked={isAllChecked}
      />
      <ExcelReportsGenerator
        year={year}
        quarter={quarter}
        quarters={quarters}
        registeredReports={registeredReports}
        onClickHandler={onClickHandler}
        onQuarterChangeHandler={onQuarterChangeHandler}
        onYearChangeHandler={onYearChangeHandler}
      />

    </StyledSection>
  )
}

export default ExcelReportsGeneratorContainer;