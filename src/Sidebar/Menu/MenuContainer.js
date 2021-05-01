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
import pages from '../../helpers/pages';
import { fetchMenu } from '../../redux/actions/menuActions';

const DEFAULT_PAGE = "הוצאות חודשיות";
const HOME_BUTTON_LABEL = "דף הבית";

const MenuContainer = ({ routes, history, data }) => {

  const dispatch = useDispatch();

  const [generateIcon] = useIcons();

  const [state, setState] = React.useState(() => {
    let newState = {};

    data.forEach(item => {
      const buildings = routes.active.expanded;
      newState[item.buildingNameEng] = {
        open: buildings[item.buildingNameEng] === undefined ? false : buildings[item.buildingNameEng].open
      }

    });

    return newState;
  });

  const routeState = routes.active.state;

  const expandHandleClick = (item) => {
    const { buildingName, buildingNameEng, path } = item;

    const expanded = {
      ...state,
      [buildingNameEng]: {
        open: !state[buildingNameEng].open
      }
    };

    // when expanding the menu item, set
    // what default page it will open
    if (state[buildingNameEng].open === false) {
      const newState = {
        page: DEFAULT_PAGE,
        buildingName: buildingName,
        buildingNameEng: buildingNameEng
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
      setState(prevState => {
        return {
          ...prevState,
          [buildingNameEng]: {
            open: true
          }
        };
      });

  }, [routeState]);

  const menuRender = data.map((item) => {

    const { buildingName, id, buildingNameEng } = item;

    return <ExpandableMenuItem
      label={buildingName}
      Icon={generateIcon("home")}
      onClick={() => expandHandleClick(item)}
      open={state[buildingNameEng].open}
      key={id}
      active={routeState.buildingName === buildingName}
    >

      {pages.map((page) => {
        const { label, path } = page;

        return <Menuitem
          label={label}
          Icon={generateIcon(label)}
          key={label}
          to={{
            pathname: `/${item.path}/${path}`,
            state: {
              page: label,
              buildingName: item.buildingName,
              buildingNameEng: item.buildingNameEng
            }
          }}
          active={routeState.page === label && routeState.buildingName === item.buildingName}
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