// LIBRARIES
import React from "react";
import { useLocation } from "react-router";
import Breadcrumbs from "./Breadcrumbs";
import Crumb from "./Crumb";


const BreadcrumbsContainer = () => {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(x => x);

  const path = pathnames.map((location, index) => {

    return <Crumb key={location} location={location} last={index === pathnames.length - 1 ? true : false} />;

  });

  return (
    <Breadcrumbs>
      <Crumb location={"דף הבית"} last={pathnames.length === 0 ? true : false} separator={false} />
      {path}
    </Breadcrumbs>
  );

}

export default BreadcrumbsContainer;