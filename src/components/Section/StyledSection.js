import React from 'react';
import ExpandableSection from "./ExpandableSection";

export default props => {

  return (
    <ExpandableSection
      {...props}
      bgColor={"#ffffff"}
      padding={"20px"}
    >
      {props.children}
    </ExpandableSection>
  );
}