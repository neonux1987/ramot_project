// LIBRARIES
import React from "react";
import { css } from 'emotion';
import { useLocation } from "react-router";

const wrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 25px 0px;
  font-size: 16px;
  color: #000000;
  padding: 8px 15px;
  font-weight: 400;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 7%);
  border-radius: 5px;
  background: #f7f7f7;
`;

const icon = css`
  margin-left: 10px;
`;

const text = css`
  margin-left: 10px;
  /* text-decoration: underline; */
  color: #525e63;
`;

const lastStyle = css`
  color: #000000;
  font-weight: 500;
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