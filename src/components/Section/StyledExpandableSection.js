import React from 'react';
import ExpandableSection from "./ExpandableSection";

const StyledExpandableSection = props => {

  return (
    <ExpandableSection
      {...props}
      bgColor={props.bgColor || "initial"}
      padding={props.padding || "15px"}
    >
      {props.children}
    </ExpandableSection>
  );
}

export default StyledExpandableSection;