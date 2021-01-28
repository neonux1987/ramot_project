import React from 'react';
import { BarLoader } from 'react-spinners';
import logo from '../../../assets/images/ramot group.png';
import { css, keyframes } from 'emotion';

const spin = keyframes`
  0% { -webkit-transform: rotateY(0deg); }
  100% { -webkit-transform: rotateY(360deg); }
`;

const override = css`
  background-color: #000;
`;

const LogoLoader = (props) => {
  return (
    <div>
      <img
        className={css`
        animation: ${spin} 3s linear infinite;
      `}
        src={logo}
        width="100px"
        height="100px"
        alt="spinning loader"
      />
      <BarLoader
        width={100}
        height={4}
        loading={props.loading}
        color={"#0365a2"}
        css={override}
      />
    </div>
  );
}

export default LogoLoader;