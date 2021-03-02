// LIBRARIES
import React from "react";
import { css } from 'emotion';

const icon = css`
  margin-left: 10px;
`;

const text = css`
  margin-left: 10px;
  color: #555555;
  text-decoration: underline;
`;

const lastStyle = css`
  color: #1489ce;
  font-weight: 500;
  text-decoration: underline;
  margin-left: 10px;
`

const Crumb = ({ last = false, location, separator = true }) => {

  return <div>
    {separator ? <span className={icon}>{"/"}</span> : null}

    <span className={last ? lastStyle : text}>
      {location}
    </span>
  </div>;

}

export default React.memo(Crumb);