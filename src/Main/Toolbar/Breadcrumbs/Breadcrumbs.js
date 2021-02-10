// LIBRARIES
import React from "react";
import { css } from 'emotion';
import { useLocation } from "react-router";

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 25px 15px;
  font-size: 16px;
  color: #000000;
  border-bottom: 1px dotted #ccc;
  padding: 10px 5px;
`;

const icon = css`
  margin-left: 10px;
  font-weight: 400;
`;

const text = css`
  margin-left: 10px;
`;

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(x => x);

  const path = pathnames.map((location, index) => {

    return <div key={location}>
      <span className={icon}>
        {"/"}
      </span>
      <span className={text} style={{ textDecoration: index !== pathnames.length - 1 ? "underline" : "none" }}>
        {location}
      </span>
    </div>;

  });

  return (
    <div className={wrapper}>
      <span className={text} style={{ textDecoration: pathnames.length === 0 ? "none" : "underline" }}>
        דף הבית
      </span>
      {path}
    </div>
  );

}

export default React.memo(Breadcrumbs);