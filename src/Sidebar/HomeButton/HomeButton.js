// LIBRARIES
import React from 'react';
import { Dashboard } from '@material-ui/icons';
import Menuitem from '../MenuItem/Menuitem';
import { css } from 'emotion';
import { Divider } from '@material-ui/core';

const style = css`
  margin-bottom: 10px !important;
  border-radius: 0;
`;

const _divider = css`
  background-color: #f5f5f5;
`;

const HOME_BUTTON_LABEL = "דף הבית";
const HOME_BUTTON_PATH = "/דף-הבית";

const HomeButton = props => {

  return (
    <div>
      <Menuitem
        className={style}
        label={HOME_BUTTON_LABEL}
        Icon={Dashboard}
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
      <Divider className={_divider} />
    </div>
  );
};

export default HomeButton;