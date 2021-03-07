// LIBRARIES
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ExpandableMenuItem from '../ExpandableMenuItem/ExpandableMenuItem';

// COMPONENTS
import Menuitem from '../MenuItem/Menuitem';

// ACTIONS
import { updateRoute } from '../../redux/actions/routesActions';

// HOOKS
import useIcons from '../../customHooks/useIcons';
import HomeButton from '../HomeButton/HomeButton';
import Menu from './Menu';

const DEFAULT_PAGE = "הוצאות חודשיות";
const HOME_BUTTON_LABEL = "דף הבית";

const MenuContainer = ({ routes, history }) => {

  const { data } = useSelector(store => store.menu);

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

  const routeState = routes.active.state;

  const expandHandleClick = (item) => {
    const { label, engLabel, path } = item;

    const expanded = {
      ...state,
      [engLabel]: {
        open: !state[engLabel].open
      }
    };

    // when expanding the menu item, set
    // what default page it will open
    if (state[engLabel].open === false) {
      const newState = {
        page: DEFAULT_PAGE,
        buildingName: label,
        buildingNameEng: engLabel
      }

      const pathname = `/${path}/הוצאות-חודשיות`;

      history.replace(pathname, newState);

      dispatch(updateRoute({
        pathname,
        state: newState,
        expanded
      }));
    }

    setState(() => {
      dispatch(updateRoute({
        expanded
      }));

      return expanded;
    });
  };

  /**
   * set initial open state for last saved path
   */
  useEffect(() => {
    const { buildingNameEng } = routeState;

    // if the building name is empty that means
    // that it's the home page, in that case don't set
    // open state
    if (buildingNameEng !== "")
      setState(() => {
        return {
          ...state,
          [buildingNameEng]: {
            open: true
          }
        };
      });

  }, [routeState]);

  const menuRender = data.map((item) => {

    const { label, submenu, id, engLabel } = item;

    return <ExpandableMenuItem
      label={label}
      Icon={generateIcon("home")}
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
    <Menu>
      <HomeButton active={routeState.page === HOME_BUTTON_LABEL} />
      {menuRender}
    </Menu>
  );

};

export default withRouter(React.memo(MenuContainer));