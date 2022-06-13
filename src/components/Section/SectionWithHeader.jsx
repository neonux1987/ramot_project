import React from "react";
import Section from "./Section";
import { css } from "emotion";
import { useSelector } from "react-redux";

const _section = css`
  background-color: #ffffff;
  border: 1px solid #dddddd;
  padding: 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem;
`;

const _header = css`
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

const SectionWithHeader = ({ header = null, children, id }) => {
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);

  return (
    <Section
      isFullscreen={isFullscreen}
      id={id}
      className={`${_section}`}
      style={{ border: isFullscreen ? "none" : "border: 1px solid #dddddd" }}
    >
      <div className={_header} id="section-header">
        {header}
      </div>
      {children}
    </Section>
  );
};

export default SectionWithHeader;
