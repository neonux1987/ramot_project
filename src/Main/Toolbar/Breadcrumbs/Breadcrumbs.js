// LIBRARIES
import React from "react";
import { css } from 'emotion';

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 25px 0px;
  font-size: 15px;
  color: rgb(0 0 0 / 63%);
`;

const icon = css`
  margin-left: 10px;
  font-weight: 600;
`;

const text = css`
  margin-left: 10px;
`;

const Breadcrumbs = ({ className = "", pathsList = [] }) => {

  const path = pathsList.map((location, index) => {

    return <div key={location}>
      <span className={icon}>
        {">"}
      </span>
      <span className={text} style={{ color: index === 0 ? "#21558ceb" : "inherit" }}>
        {location}
      </span>
    </div>;

  });

  return (
    <div className={wrapper}>
      {path}
    </div>
  );

}

export default React.memo(Breadcrumbs);