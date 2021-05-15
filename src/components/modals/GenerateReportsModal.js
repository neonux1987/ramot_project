import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Helper from '../../helpers/Helper';
import ExcelReportsGenerator from '../../pages/Management/pages/Reports/ExcelReportsGenerator/ExcelReportsGenerator';
import { fetchRegisteredReportsByYear, fetchRegisteredReportsGroupedByYear } from '../../redux/actions/registeredReportsActions';
import { exportReports } from '../../services/reports.svc';
import Section from '../Section/Section';

import EditModal from './modalTypes/EditModal';

const GenerateReportsModal = ({ buildingName, buildingId }) => {
  const date = new Date();//current date

  const [year, setYear] = useState(date.getFullYear());
  const [quarter, setQuarter] = useState(Helper.getCurrentQuarter(date.getMonth()));

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

    exportReports(newDate, [{ buildingName, buildingId }]);
  }

  return (
    <EditModal
      title={`הפקת דוחות לבניין ${buildingName}`}
      hideAgreeButton={true}
      cancelBtnText="סגור"
    >
      <Section marginTop="30px">
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
    </EditModal>
  );
}

export default GenerateReportsModal;