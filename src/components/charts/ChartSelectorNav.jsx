// LIBRARIES
import React from "react";
import { Button } from "@material-ui/core";
import { css } from "emotion";
import classnames from "classnames";

const BY_MONTHS_TITLE = "הוצאות והכנסות לפי חודשים";
const BY_QUARTERS_TITLE = "הוצאות והכנסות לפי רבעונים";
const BY_YEARS_TITLE = "הוצאות והכנסות לפי שנים";
const TOP_EXPANSES_TITLE = "טופ הוצאות";

const activeClass = css`
  background-color: rgb(23, 110, 193);
  color: #ffffff !important;

  :hover {
    background-color: rgb(23, 110, 193);
  }
`;

const button = css`
  color: #000000;
`;

const ChartSelectorNav = ({ active, onClick }) => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <StyledButton
        onClick={() => onClick(BY_MONTHS_TITLE)}
        className={active === BY_MONTHS_TITLE ? activeClass : ""}
      >
        חודשים
      </StyledButton>
      <StyledButton
        onClick={() => onClick(BY_QUARTERS_TITLE)}
        className={active === BY_QUARTERS_TITLE ? activeClass : ""}
      >
        רבעונים
      </StyledButton>
      <StyledButton
        onClick={() => onClick(BY_YEARS_TITLE)}
        className={active === BY_YEARS_TITLE ? activeClass : ""}
      >
        שנים
      </StyledButton>
      <StyledButton
        onClick={() => onClick(TOP_EXPANSES_TITLE)}
        className={active === TOP_EXPANSES_TITLE ? activeClass : ""}
      >
        טופ
      </StyledButton>
    </div>
  );
};

export default ChartSelectorNav;

const StyledButton = ({ children, onClick, className }) => {
  return (
    <Button
      classes={{ text: button }}
      className={classnames(button, className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
