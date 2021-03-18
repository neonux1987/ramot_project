import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import logo from '../../../assets/images/ramot group.png';
import { css, keyframes } from 'emotion';

const container = css`
  background: #efefef;
  padding: 50px;
  box-shadow: 0 0 4px 4px #00000003;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const spin = keyframes`
  0% { -webkit-transform: rotateY(0deg); }
  100% { -webkit-transform: rotateY(360deg); }
`;

const override = css`
  background-color: #000;
`;

const LogoLoader = (props) => {
  return (
    <div className={container}>
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