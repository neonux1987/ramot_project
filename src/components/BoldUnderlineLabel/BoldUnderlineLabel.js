import React from 'react';
import SubtitleBoldTypography from '../Typographies/SubtitleBoldTypography';

const BoldUnderlineLabel = props => {
  const { label, children } = props;

  return <div style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
    <SubtitleBoldTypography underline style={{ fontSize: "16px" }}>
      {label}
    </SubtitleBoldTypography>
    <div style={{ marginRight: "5px" }}>
      {children}
    </div>
  </div>;
}

export default BoldUnderlineLabel;