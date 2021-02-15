// LIBRARIES
import React from "react";
import { css } from 'emotion';
import { useLocation } from "react-router";

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 25px 0px;
  font-size: 16px;
  color: #000000;
  border-bottom: 1px dotted #ccc;
  padding: 10px 5px;
  font-weight: 400;
`;

const icon = css`
  margin-left: 10px;
`;

const text = css`
  margin-left: 10px;
  /* text-decoration: underline; */
`;

const lastStyle = css`
  color: #21558ceb;
  text-decoration: none;
  margin-left: 10px;
`

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(x => x);

  const path = pathnames.map((location, index) => {

    return <div key={location}>
      <span className={icon}>
        {"/"}
      </span>
      <span className={index !== pathnames.length - 1 ? text : lastStyle}>
        {location}
      </span>
    </div>;

  });

  return (
    <div className={wrapper}>
      <span className={pathnames.length === 0 ? lastStyle : text} style={{ textDecoration: pathnames.length === 0 ? "none" : "none" }}>
        דף הבית
      </span>
      {path}
    </div>
  );

}

export default React.memo(Breadcrumbs);