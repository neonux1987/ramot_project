import React from 'react';
import Section from './Section';
import { css } from 'emotion';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

const _section = css`
  box-shadow: 0 0 12px 2px rgb(0 0 0 / 6%);
  background-color: #ffffff;
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
    className={_section}
  >
    <div className={classnames(_header, css`background-color: ${bgColor}`)} id="section-header">{header}</div>
    {children}

  </Section>;
}

export default SectionWithHeader;