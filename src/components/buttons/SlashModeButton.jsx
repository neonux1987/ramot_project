import React from 'react';
import { css } from 'emotion';
import SquareButton from './SquareButton';

const _slash = css`
  ::after{
    content: '|';
    color: red;
    display: block;
    font-weight: bold;
    text-align: center;
    font-size: 2.5em;
    transform: rotate(-45deg);
    position: absolute;
    top: -13px;
    left: 8px;
  }
`;

const SlashModeButton = ({ Icon, iconColor, onClick, on = false }) => {

  const style = on ? _slash : undefined;

  return <SquareButton className={style} Icon={Icon} onClick={onClick} iconColor={iconColor} />;
};

export default SlashModeButton;