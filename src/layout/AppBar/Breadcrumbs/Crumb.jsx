// LIBRARIES
import React from "react";
import { css } from "emotion";

const icon = css`
  margin: 0 5px;
`;

const text = css`
  color: #000000;
`;

const lastStyle = css`
  color: #000000;
  font-weight: 600;
`;

const Crumb = ({ last = false, location }) => {
  return (
    <div>
      <span className={last ? lastStyle : text}>{location}</span>

      {!last ? <span className={icon}>{"/"}</span> : null}
    </div>
  );
};

export default Crumb;
