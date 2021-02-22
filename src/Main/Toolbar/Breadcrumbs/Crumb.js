// LIBRARIES
import React from "react";
import { css } from 'emotion';

const icon = css`
  margin-left: 10px;
`;

const text = css`
  margin-left: 10px;
  color: #525e63;
`;

const lastStyle = css`
  color: #000000;
  font-weight: 500;
  text-decoration: none;
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