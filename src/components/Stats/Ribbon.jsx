import React from "react";
import { css } from "emotion";

const ribbon = css`
  /* filter: drop-shadow(2px 3px 2px rgb(0 0 0 / 21%)); */
  filter: drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.5));
  position: absolute;
  top: -3px;
  right: 30px;
  z-index: 888;

  @media (max-width: 1650px) {
    right: 20px;
  }
`;

const ribbonContent = css`
  width: 65px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 8px),
    50% 100%,
    0 calc(100% - 8px)
  );
  transition: clip-path 1s, height 1s, width 1s, background 1s;

  @media (max-width: 1400px) {
    width: 45px;
    height: 55px;
    transition: clip-path 1s, height 1s, width 1s, background 1s;
  }

  @media (min-width: 1400px) and (max-width: 1650px) {
    width: 50px;
    height: 65px;
    transition: clip-path 1s, height 1s, width 1s, background 1s;
  }
`;

const Ribbon = ({ color, Icon }) => (
  <div className={ribbon}>
    <div
      className={ribbonContent}
      style={{
        background: `${color} linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.25) 100%)`
      }}
    >
      <Icon />
    </div>
  </div>
);

export default Ribbon;
