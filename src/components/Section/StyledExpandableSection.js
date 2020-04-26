import React from 'react';
import ExpandableSection from "./ExpandableSection";

export default props => {

  return (
    <ExpandableSection
      {...props}
      bgColor={props.bgColor || "#ffffff"}
      padding={props.padding || "10px"}
    >
      {props.children}
    </ExpandableSection>
  );
}