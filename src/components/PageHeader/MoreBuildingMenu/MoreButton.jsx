// LIBRARIES
import React from "react";
import { IoMdSettings } from "react-icons/io";
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { css } from 'emotion';
import classnames from 'classnames';
import SvgIcon from "../../SvgIcon/SvgIcon";

const wrapper = css`
  flex-grow: 1;
  justify-content: flex-end;
`;

const button = css`
  padding: 0;
  min-width: 0;
  margin-left: 10px;
  border-radius: 100%;
`;

const MoreButton = ({ onClick, active }) => {
  return <div className={wrapper}>
    <ButtonWithSound onClick={onClick} className={classnames(button, active ? "activeExpandItem" : "")}>
      <SvgIcon Icon={IoMdSettings} color="#000000" size="32px" />
    </ButtonWithSound>
  </div>

}

export default React.memo(MoreButton);