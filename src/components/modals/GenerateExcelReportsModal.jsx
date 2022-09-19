import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Helper from "../../helpers/Helper";
import ExcelReportsGenerator from "../../pages/Management/pages/Reports/ExcelReportsGenerator/ExcelReportsGenerator";
import {
  fetchRegisteredReportsByYear,
  fetchRegisteredReportsGroupedByYear
} from "../../redux/actions/registeredReportsActions";
import { exportReports } from "../../services/reports.svc";
import EditModal from "./modalTypes/EditModal";
import Box from "@material-ui/core/Box";
import useIsMounted from "../../customHooks/useIsMounted";

const GenerateExcelReportsModal = ({ buildingName, buildingId }) => {
  const date = new Date(); //current date

  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  const [year, setYear] = useState(date.getFullYear());
  const [quarter, setQuarter] = useState(
    Helper.getCurrentQuarter(date.getMonth())
  );
  const [quarters, setQuarters] = useState([]);

  const registeredReports = useSelector((store) => store.registeredReports);

  useEffect(() => {
    dispatch(fetchRegisteredReportsGroupedByYear()).then((result) => {
      const yearsData = result.data;

      if (yearsData.length > 0 && isMounted()) {
        const lastYear = yearsData[0].year;
        setYear(() => lastYear);

        dispatch(fetchRegisteredReportsByYear(lastYear)).then(({ data }) => {
          if (data.length > 0 && isMounted())
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

    exportReports(newDate, [{ buildingName, buildingId }]);
  };
  console.log(registeredReports);
  return (
    <EditModal
      id={GenerateExcelReportsModal}
      title={`הפקת דוחות אקסל לבניין ${buildingName}`}
      hideAgreeButton={true}
      cancelBtnText="סגור"
    >
      <Box margin="40px">
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
    </EditModal>
  );
};

export default GenerateExcelReportsModal;
