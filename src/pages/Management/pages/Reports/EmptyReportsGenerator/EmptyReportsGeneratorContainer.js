// LIBRARIES
import React, { useState } from 'react';
import { Description } from '@material-ui/icons';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';

// COMPONENTS
import EmptyReportsGenerator from './EmptyReportsGenerator';
import StyledSection from '../../../../../components/Section/StyledSection';
import Section from '../../../../../components/Section/Section';

// UTILS
import Helper from '../../../../../helpers/Helper';

// SERVICES
import { generateEmptyReports } from '../../../../../services/emptyReportsGenerator.svc';

const years = generateYears(new Date().getFullYear());
const quarters = Helper.getYearQuarters();

const EmptyReportsGeneratorContainer = () => {
  const date = new Date();//current date

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

    generateEmptyReports(newDate);
  }

  return (
    <StyledSection
      title={"הפקת דוחות ריקים - רבעוניים"}
      Icon={Description}
    >
      <Section marginBottom="50px">
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

export default withRouter(EmptyReportsGeneratorContainer);