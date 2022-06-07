import React from "react";
import { Button } from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import { css } from "emotion";

const expandIconCss = css`
  font-size: 40px;
  transition: transform ease 0.3s;
`;

const rotate = css`
  transform: rotate(180deg);
`;

const ExpandButton = ({ checked, onClick, color = "#000000" }) => {
  return (
    <Button onClick={onClick}>
      <ExpandLess
        className={`${expandIconCss} ${!checked ? rotate : ""}`}
        style={{ color }}
      />
    </Button>
  );
};

export default ExpandButton;
