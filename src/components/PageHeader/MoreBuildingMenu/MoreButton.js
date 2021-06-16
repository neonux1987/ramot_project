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
  width: 60px;
  height: 60px;
  padding: 0;
  min-width: 0;
  margin-left: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const MoreButton = ({ onClick, active }) => {
  return <div className={wrapper}>
    <ButtonWithSound onClick={onClick} className={classnames(button, active ? "activeExpandItem" : "")}>
      <SvgIcon Icon={IoMdSettings} color="#555555" size="42px" />
    </ButtonWithSound>
  </div>

}

export default React.memo(MoreButton);