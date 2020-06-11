import React from 'react';
import ExpandableSection from "./ExpandableSection";

export default props => {

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