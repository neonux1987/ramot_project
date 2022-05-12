import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import logo from '../../../assets/images/ramot group.png';
import { css, keyframes } from 'emotion';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';

const container = css`
  background: #efefef;
  flex-direction: column;
`;

const imageWrapper = css`
  /* height: 88px; */
  overflow: hidden;
  margin-bottom: 10px;
  width: 200px;
  display: flex;
  justify-content: center;
  /* box-shadow: 0px -5px 4px -4px #0000001a inset; */
`;

const spin = keyframes`
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
`;

const LogoLoader = (props) => {
  return (
    <AlignCenterMiddle className={container}>
      <div className={imageWrapper}>
        <img
          className={css`
          animation: ${spin} 3s linear infinite;
          filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.19));
      `}
          src={logo}
          width="100px"
          height="100px"
          alt="spinning loader"
        />
      </div>
      <PropagateLoader
        size={15}
        loading={props.loading}
        color={"#0365a2"}
      />
    </AlignCenterMiddle>
  );
}

export default LogoLoader;