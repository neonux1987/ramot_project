// LIBRARIES
import React from 'react';
import Menuitem from '../Menu/MenuItem/Menuitem';
import { css } from 'emotion';
import useIconWrapper from '../../../customHooks/useIconWrapper';

const style = css`
  border-radius: 0;
  margin: 5px 0;
`;

const labelStyle = css`
  font-weight: 500;
`;

const HOME_BUTTON_LABEL = "דף הבית";
const HOME_BUTTON_PATH = "/דף-הבית";

const HomeButton = props => {

  const [getIcon] = useIconWrapper();

  return (
    <div>
      <Menuitem
        className={style}
        labelClassName={labelStyle}
        label={HOME_BUTTON_LABEL}
        Icon={getIcon({ iconName: "ic:round-space-dashboard" })}
        to={{
          pathname: HOME_BUTTON_PATH,
          state: {
            page: HOME_BUTTON_LABEL,
            buildingName: "",
            buildingId: ""
          }
        }}
        active={props.active === HOME_BUTTON_LABEL}
      />
    </div>
  );
};

export default HomeButton;