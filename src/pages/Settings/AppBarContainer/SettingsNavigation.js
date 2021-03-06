import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import AppBar from '../../../components/Tabs/AppBar';
import Tabs from '../../../components/Tabs/Tabs';
import Tab from '../../../components/Tabs/Tab';

const SettingsNavigation = props => {
  const { match } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const currentActive = useSelector(store => store.routes.active);
  const page = currentActive.state.page;

  return (
    <AppBar>
      <Tabs
        value={value}
        onChange={handleChange}
      >
        <Tab
          label="כללי"
          to={{
            pathname: `${match.path}/כללי`,
            state: {
              page: "כללי",
              buildingName: "הגדרות"
            }
          }}
          active={page === "כללי" ? true : false}
        />
        <Tab
          label="עיצוב"
          to={{
            pathname: `${match.path}/עיצוב`,
            state: {
              page: "עיצוב",
              buildingName: "הגדרות"
            }
          }}
          active={page === "עיצוב" ? true : false}
        />
        <Tab
          label="גיבוי ושחזור"
          to={{
            pathname: `${match.path}/גיבוי ושחזור`,
            state: {
              page: "גיבוי ושחזור",
              buildingName: "הגדרות"
            }
          }}
          active={page === "גיבוי ושחזור" ? true : false}
        />
        <Tab
          label="עדכוני תוכנה"
          to={{
            pathname: `${match.path}/עדכוני תוכנה`,
            state: {
              page: "עדכוני תוכנה",
              buildingName: "הגדרות"
            }
          }}
          active={page === "עדכוני תוכנה" ? true : false}
        />
        <Tab
          label="אודות"
          to={{
            pathname: `${match.path}/אודות`,
            state: {
              page: "אודות",
              buildingName: "הגדרות"
            }
          }}
          active={page === "אודות" ? true : false}
        />
      </Tabs>
    </AppBar>
  );

}

export default SettingsNavigation;