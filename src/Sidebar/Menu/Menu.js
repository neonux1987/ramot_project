// LIBRARIES
import React from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ExpandableMenuItem from '../ExpandableMenuItem/ExpandableMenuItem';

// COMPONENTS
import Menuitem from '../MenuItem/Menuitem';

// CSS
import {
  list,
  homeBtn,
  homeBtnText,
  homeBtnIcon,
  listItemText
} from './Menu.module.css';

// ACTIONS
import { updateRoute } from '../../redux/actions/routesActions';

// HOOKS
import useIcons from '../../customHooks/useIcons';

const DEFAULT_PAGE = "הוצאות חודשיות";
const HOME_BUTTON_LABEL = "דף הבית";
const HOME_BUTTON_PATH = "/";

const Menu = (props) => {

  const { data, routes } = props;
  const routeState = routes.active.state;

  const dispatch = useDispatch();

  const [generateIcon] = useIcons();

  const [state, setState] = React.useState(() => {
    let newState = {};

    data.forEach(item => {
      const buildings = routes.active.expanded;
      newState[item.engLabel] = {
        open: buildings[item.engLabel] === undefined ? false : buildings[item.engLabel].open
      }

    });

    return newState;
  });

  //console.log(state);

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

      props.history.replace(pathname, newState);

      setState(() => {
        const expanded = {
          ...state,
          [engLabel]: {
            open: !state[engLabel].open
          }
        };

        dispatch(updateRoute({
          pathname,
          state: newState,
          expanded
        }));

        return expanded;
      });
    }
  };

  const menuRender = data.map((item) => {

    const { label, submenu, id, engLabel } = item;

    return <ExpandableMenuItem
      label={label}
      Icon={generateIcon("Home")}
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
          textClassName={listItemText}
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
        Icon={generateIcon("Dashboard")}
        className={homeBtn}
        textClassName={homeBtnText}
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