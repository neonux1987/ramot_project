// LIBRARIES
import React from 'react';
import { Button } from '@material-ui/core';
import { css } from 'emotion';

const BY_MONTHS_TITLE = "הוצאות והכנסות לפי חודשים";
const BY_QUARTERS_TITLE = "הוצאות והכנסות לפי רבעונים";
const BY_YEARS_TITLE = "הוצאות והכנסות לפי שנים";
const TOP_EXPANSES_TITLE = "טופ הוצאות";

const activeClass = css`
  background-color: #0000004d;
`;

const button = css`
  color: #ffffff;
`;

const ChartSelectorNav = ({ active, onClick }) => {

  return <div style={{ paddingLeft: "10px" }}>
    <StyledButton className={button} onClick={() => onClick(BY_MONTHS_TITLE)} className={active === BY_MONTHS_TITLE ? activeClass : ""}>חודשים</StyledButton>
    <StyledButton className={button} onClick={() => onClick(BY_QUARTERS_TITLE)} className={active === BY_QUARTERS_TITLE ? activeClass : ""}>רבעונים</StyledButton>
    <StyledButton className={button} onClick={() => onClick(BY_YEARS_TITLE)} className={active === BY_YEARS_TITLE ? activeClass : ""}>שנים</StyledButton>
    <StyledButton className={button} onClick={() => onClick(TOP_EXPANSES_TITLE)} className={active === TOP_EXPANSES_TITLE ? activeClass : ""}>טופ</StyledButton>
  </div>;

}

export default ChartSelectorNav;

const StyledButton = ({ children, onClick, className }) => {
  return <Button classes={{ text: button }} className={button} onClick={onClick} className={className}>{children}</Button>;
}