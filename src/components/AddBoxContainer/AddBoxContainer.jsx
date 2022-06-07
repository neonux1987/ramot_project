import React from "react";
import { css } from "emotion";

const wrapper = css`
  height: 0;
  background: #ffffff;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 9;
  position: relative;
  opacity: 0;
  border-bottom: 1px solid #dddddd;
`;

const childrenWrapper = css`
  display: flex;
  padding: 10px;
`;

const transitionOut = css`
  height: 0px;
  opacity: 0;
  overflow: hidden;
  transition: height ease 200ms, opacity ease 200ms;
`;

const transitionIn = css`
  height: 75px;
  opacity: 1;
  transition: height ease 200ms, opacity 100ms ease 100ms;
  overflow: initial;
`;

const AddBoxContainer = ({ show, children }) => (
  <div
    className={`${wrapper} ${!show ? transitionOut : transitionIn}`}
    id="add-box"
  >
    <div className={childrenWrapper}>{children}</div>
  </div>
);

export default AddBoxContainer;
