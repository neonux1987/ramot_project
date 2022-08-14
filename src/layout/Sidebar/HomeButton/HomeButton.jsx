// LIBRARIES
import React from "react";
import Menuitem from "../Menu/MenuItem/Menuitem";
import { css } from "emotion";
import DashboardIcon from "../../../components/Icons/DashboardIcon";

const style = css`
  border-radius: 0;
`;

const labelStyle = css`
  font-weight: 400;
`;

const HOME_BUTTON_LABEL = "דף הבית";
const HOME_BUTTON_PATH = "/דף-הבית";

const HomeButton = (props) => (
  <div>
    <Menuitem
      className={style}
      labelClassName={labelStyle}
      label={HOME_BUTTON_LABEL}
      Icon={DashboardIcon}
      to={{
        pathname: HOME_BUTTON_PATH,
        state: {
          page: HOME_BUTTON_LABEL,
          buildingName: "דף הבית",
          buildingId: "home"
        }
      }}
      active={props.active === HOME_BUTTON_LABEL}
    />
  </div>
);

export default React.memo(HomeButton);
