import React from 'react';
import Section from './Section';
import { css } from 'emotion';
import { useSelector } from 'react-redux';

const _section = css`
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 0px 20px 0px rgb(44 101 144 / 10%);
`;

const _header = css`
  height: 60px;
  display: flex;
  align-items: center;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
`;

const SectionWithHeader = ({ header = null, children, id, bgColor = "#0e7ab9" }) => {
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