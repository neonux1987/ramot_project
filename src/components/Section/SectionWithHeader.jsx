import React from 'react';
import Section from './Section';
import { css } from 'emotion';
import { useSelector } from 'react-redux';

const _section = css`
  background-color: #ffffff;
  padding: 0;
`;

const _header = css`
  display: flex;
  align-items: center;
`;

const SectionWithHeader = ({ header = null, children, id }) => {
  const isFullscreen = useSelector(store => store.fullscreen.isFullscreen);

  return <Section
    isFullscreen={isFullscreen}
    id={id}
    className={`${_section}`}
  >
    <div className={_header} id="section-header">{header}</div>
    {children}

  </Section>;
}

export default SectionWithHeader;