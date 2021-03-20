// LIBRARIES
import React, { useState } from 'react';
import { Description } from '@material-ui/icons';

// COMPONENTS
import EmptyReportsGenerator from './EmptyReportsGenerator';
import StyledSection from '../../../../../components/Section/StyledSection';

// UTILS
import Helper from '../../../../../helpers/Helper';

// SERVICES
import { generateEmptyReports } from '../../../../../services/emptyReportsGenerator.svc';

import { withRouter } from 'react-router';


const years = generateYears(new Date().getFullYear());
const quarters = Helper.getYearQuarters();

const EmptyReportsGeneratorContainer = (props) => {
  const date = new Date();//current date

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
    generateEmptyReports(newDate);
  }

  return (
    <StyledSection
      title={"הפקת דוחות חדשים (ריקים)"}
      Icon={Description}
      bgColor="#0365a2"
    >
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