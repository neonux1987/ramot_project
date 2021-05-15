// LIBRARIES
import React from 'react';
import { Dashboard } from '@material-ui/icons';
import Menuitem from '../MenuItem/Menuitem';

const HOME_BUTTON_LABEL = "דף הבית";
const HOME_BUTTON_PATH = "/דף-הבית";

const HomeButton = props => {

  return (
    <Menuitem
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
      active={props.active}
    />
  );
};

export default HomeButton;