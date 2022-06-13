// LIBRARIES
import React from "react";
import ButtonWithSound from "../../../componentsWithSound/ButtonWithSound/ButtonWithSound";
import { css } from 'emotion';
import classnames from 'classnames';
import SvgIcon from "../../SvgIcon/SvgIcon";
import useIconWrapper from "../../../customHooks/useIconWrapper";

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

  const [getIcon] = useIconWrapper();

  return <div className={wrapper}>
    <ButtonWithSound onClick={onClick} className={classnames(button, active ? "activeExpandItem" : "")}>
      <SvgIcon Icon={getIcon({ iconName: "ci:settings-filled", width: "36px", height: "36px" })} color="#000000" />
    </ButtonWithSound>
  </div>

}

export default React.memo(MoreButton);