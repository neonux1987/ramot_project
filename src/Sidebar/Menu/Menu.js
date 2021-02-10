// LIBRARIES
import React from 'react';
import { withRouter } from 'react-router';
import { List } from '@material-ui/core';
import ExpandableMenuItem from '../ExpandableMenuItem/ExpandableMenuItem';
import { Home, AttachMoney, AssignmentTurnedIn, InsertChartOutlined, Receipt, Label, Dashboard } from '@material-ui/icons';

// COMPONENTS
import Menuitem from '../MenuItem/Menuitem';

// CSS
import {
  list,
  homeBtn,
  homeBtnText,
  homeBtnIcon
} from './Menu.module.css';
import { updateRoute } from '../../redux/actions/routesActions';
import { useDispatch } from 'react-redux';

const DEFAULT_PAGE = "הוצאות חודשיות";
const HOME_BUTTON_LABEL = "דף הבית";
const HOME_BUTTON_PATH = "/";

const Menu = (props) => {

  const { data, routeState } = props;

  const dispatch = useDispatch();

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
      case "הוצאות חודשיות": return AttachMoney;
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

      const pathname = `/${path}/הוצאות-חודשיות`;

      dispatch(updateRoute({ pathname, state: newState }));

      props.history.replace(pathname, newState);
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
      active={routeState.buildingName === label}
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
      <Menuitem
        label={HOME_BUTTON_LABEL}
        Icon={Dashboard}
        className={homeBtn}
        //textClassName={homeBtnText}
        iconClassName={homeBtnIcon}
        to={{
          pathname: HOME_BUTTON_PATH,
          state: {
            page: HOME_BUTTON_LABEL,
            buildingName: "",
            buildingNameEng: ""
          }
        }}
        active={routeState.page === HOME_BUTTON_LABEL}
      />

      {menuRender}
    </List>
  );

};

export default withRouter(Menu);