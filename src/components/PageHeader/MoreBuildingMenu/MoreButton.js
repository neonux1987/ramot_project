// LIBRARIES
import React from "react";
import { IoMdSettings } from "react-icons/io";
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { css } from 'emotion';
import classnames from 'classnames';
import SvgIcon from "../../SvgIcon/SvgIcon";

const wrapper = css`
  position: relative;
`;

const button = css`
  width: 52px;
  height: 52px;
  padding: 0;
  min-width: 0;
  margin-left: 20px;
  position: absolute;
  bottom: 15px;
  left: 0;
  background: #222A45;
  border-radius: 100%;
  box-shadow: 0px 7px 8px -4px rgb(0 0 0 / 6%), 0px 12px 17px 2px rgb(0 0 0 / 4%), 0px 5px 22px 4px rgb(0 0 0 / 4%);
`;

const MoreButton = ({ onClick, active }) => {
  return <div className={wrapper}>
    <ButtonWithSound onClick={onClick} className={classnames(button, active ? "activeExpandItem" : "")}>
      <SvgIcon Icon={IoMdSettings} color="#ffffff" size="32px" />
    </ButtonWithSound>
  </div>

}

export default React.memo(MoreButton);