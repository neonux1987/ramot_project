import React, { useCallback, useState } from 'react';
import Helper from '../../helpers/Helper';
import EmptyReportsGenerator from '../../pages/Management/pages/Reports/EmptyReportsGenerator/EmptyReportsGenerator';
import { generateEmptyReports } from '../../services/emptyReportsGenerator.svc';
import CheckboxWithLabel from '../Checkboxes/CheckboxWithLabel';
import Section from '../Section/Section';
import EditModal from './modalTypes/EditModal';

const years = generateYears(new Date().getFullYear());
const quarters = Helper.getYearQuarters();

const GenerateEmptyReportsModal = ({ buildingName, buildingId }) => {
  const date = new Date();//current date

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

    generateEmptyReports({ date: newDate, buildings: [{ buildingName, buildingId }], fromPreviousReports });
  }

  const onCheckedHandler = useCallback(event => {
    setFromPreviousReports(event.target.checked);
  }, []);

  return (
    <EditModal
      title={`הפקת דוחות אקסל לבניין ${buildingName}`}
      hideAgreeButton={true}
      cancelBtnText="סגור"
    >
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
    </EditModal>
  );
}

export default GenerateEmptyReportsModal;

function generateYears(currentYear) {
  const arr = [];
  const backToYearLimit = currentYear - 5;
  for (let i = currentYear; i > backToYearLimit; i--)
    arr.push(i);

  return arr;
}