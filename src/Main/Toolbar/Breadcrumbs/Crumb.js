// LIBRARIES
import React from "react";
import { css } from 'emotion';

const icon = css`
  margin-left: 6px;
`;

const text = css`
  margin-left: 6px;
  color: #7d7d7d;
`;

const lastStyle = css`
  color: #9e9e9e;
  font-weight: 400;
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