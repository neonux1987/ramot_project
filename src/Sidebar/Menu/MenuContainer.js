// LIBRARIES
import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import ExpandableMenuItem from '../ExpandableMenuItem/ExpandableMenuItem';

// COMPONENTS
import Menuitem from '../MenuItem/Menuitem';

// ACTIONS
import { updateRoute } from '../../redux/actions/routesActions';

// HOOKS
import useIcons from '../../customHooks/useIcons';
import HomeButton from '../HomeButton/HomeButton';
import Menu from './Menu';
import pages from '../../helpers/pages';

const DEFAULT_PAGE = "הוצאות חודשיות";
const HOME_BUTTON_LABEL = "דף הבית";

const MenuContainer = ({ routes, history, data }) => {
  let counter = 1;

  const dispatch = useDispatch();

  const [generateIcon] = useIcons();

  const [state, setState] = React.useState(() => {
    let newState = {};

    data.forEach(item => {
      const buildings = routes.active.expanded;
      newState[item.buildingId] = {
        open: buildings[item.buildingId] === undefined ? false : buildings[item.buildingId].open
      }

    });

    return newState;
  });

  const routeState = routes.active.state;

  const expandHandleClick = (item) => {
    const { buildingName, buildingId, path } = item;

    const expanded = {
      ...state,
      [buildingId]: {
        open: !state[buildingId].open
      }
    };

    // when expanding the menu item, set
    // what default page it will open
    if (state[buildingId].open === false) {
      const newState = {
        page: DEFAULT_PAGE,
        buildingName: buildingName,
        buildingId: buildingId
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
    const { buildingId } = routeState;

    // if the building name is empty that means
    // that it's the home page, in that case don't set
    // open state
    if (buildingId !== "")
      setState(prevState => {
        return {
          ...prevState,
          [buildingId]: {
            open: true
          }
        };
      });

  }, [routeState]);

  useEffect(() => {
    const element = document.querySelector('.activeButton');

    if (element !== null) {
      element.focus();
      element.blur();
    }
  }, []);

  const menuRender = data.map((item) => {

    const { buildingName, buildingId } = item;

    return <ExpandableMenuItem
      label={buildingName}
      Icon={generateIcon("home")}
      onClick={() => expandHandleClick(item)}
      open={state[buildingId].open}
      key={buildingId}
      active={routeState.buildingName === buildingName}
    >

      {pages.map((page) => {
        const { label, path } = page;
        const active = routeState.page === label && routeState.buildingName === item.buildingName;

        return <Menuitem
          label={label}
          Icon={generateIcon(label)}
          key={label}
          tabIndex={counter++}
          to={{
            pathname: `/${item.path}/${path}`,
            state: {
              page: label,
              buildingName: item.buildingName,
              buildingId: item.buildingId
            }
          }}
          active={active}
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