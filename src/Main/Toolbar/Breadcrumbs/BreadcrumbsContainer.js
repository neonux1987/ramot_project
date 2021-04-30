// LIBRARIES
import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import Crumb from "./Crumb";


const BreadcrumbsContainer = ({ pathname }) => {
  const pathnames = pathname.split("/").filter(x => x);

  // if it's only 1, it means it's the home page
  // in that case don't run, home page is separate 
  const path = pathnames.length > 1 && pathnames.map((location, index) => {
    const newLocation = location.replace(/-/g, " ");
    return <Crumb key={location} location={newLocation} last={index === pathnames.length - 1 ? true : false} />;
  });

  return (
    <Breadcrumbs>
      <Crumb location={"דף הבית"} last={pathnames.length === 0 ? true : false} separator={false} />
      {path}
    </Breadcrumbs>
  );

}

export default React.memo(BreadcrumbsContainer);