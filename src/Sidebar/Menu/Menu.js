// LIBRARIES
import React from 'react';
import { withRouter } from 'react-router';
import { List } from '@material-ui/core';
import ExpandableMenuItem from '../ExpandableMenuItem/ExpandableMenuItem';
import { Home, AttachMoney, AssignmentTurnedIn, InsertChartOutlined, Receipt, Label } from '@material-ui/icons';

// COMPONENTS
import Menuitem from '../MenuItem/Menuitem';

// CSS
import {
  list,
  listSubheader
} from './Menu.module.css';

const DEFAULT_PAGE = "הוצאות חודשי";

const Menu = (props) => {

  const { data, routeState } = props;

  const [state, setState] = React.useState(() => {
    let newState = {};
    data.forEach(item => {
      newState[item.engLabel] = {
        open: false
      }
    });
    return newState;
  });

  const generateIcon = (pageName) => {
    switch (pageName) {
      case "הוצאות חודשי": return AttachMoney;
      case "ביצוע מול תקציב": return AssignmentTurnedIn;
      case "סיכום שנתי": return InsertChartOutlined;
      case "סטטיסטיקה": return Receipt;
      default: return Label
    };
  }

  const expandHandleClick = (item) => {
    const { label, engLabel, path } = item;

    // when expanding the menu item, set
    // what default page it will open
    if (state[engLabel].open === false) {
      const newState = {
        page: DEFAULT_PAGE,
        buildingName: label,
        buildingNameEng: engLabel
      }

      props.history.replace(`/${path}/הוצאות-חודשי`, newState);
    }

    setState({
      ...state,
      [engLabel]: {
        open: !state[engLabel].open
      }
    });
  };

  const menuRender = data.map((item) => {

    const { label, submenu, id, engLabel } = item;

    return <ExpandableMenuItem
      label={label}
      Icon={Home}
      onClick={() => expandHandleClick(item)}
      open={state[engLabel].open}
      key={id}
    >

      {submenu.map((subItem) => {
        const { label, id, path } = subItem;

        return <Menuitem
          label={label}
          Icon={generateIcon(label)}
          key={id}
          to={{
            pathname: `/${item.path}/${path}`,
            state: {
              page: label,
              buildingName: item.label,
              buildingNameEng: item.engLabel
            }
          }}
          active={routeState.page === label && routeState.buildingName === item.label}
        />;
      })}

    </ExpandableMenuItem>;
  })

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={list}
    >
      {menuRender}
    </List>
  );

};

export default withRouter(Menu);