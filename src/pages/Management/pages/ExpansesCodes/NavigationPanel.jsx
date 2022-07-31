import React from "react";
import AppBar from "@material-ui/core/AppBar";

import { makeStyles } from "@material-ui/core/styles";
import Tab from "../../../../components/Tabs/Tab";
import Tabs from "../../../../components/Tabs/Tabs";
import { useSelector } from "react-redux";

function a11yProps(index) {
  return {
    id: `expanses-codes-tab-${index}`,
    "aria-controls": `expanses-codes-tab-${index}`
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    background: "transparent",
    boxShadow: "none"
  }
}));

const NavigationPanel = ({ match }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const currentActive = useSelector((store) => store.routes.active);
  const page = currentActive.state.page;

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" classes={{ root: classes.root }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="expanses codes navigation panel"
      >
        <Tab
          to={{
            pathname: `${match.path}/קודי הנהלת חשבונות`,
            state: {
              page: "קודי הנהלת חשבונות",
              buildingName: "ניהול קודי הנהלת חשבונות"
            }
          }}
          label="קודי הנהלת חשבונות"
          active={page === "קודי הנהלת חשבונות" ? true : false}
          {...a11yProps(0)}
        />
        <Tab
          to={{
            pathname: `${match.path}/הגדרת קודי ברירת מחדל`,
            state: {
              page: "הגדרת קודי ברירת מחדל",
              buildingName: "ניהול קודי הנהלת חשבונות"
            }
          }}
          label="הגדרת קודי ברירת מחדל"
          active={page === "הגדרת קודי ברירת מחדל" ? true : false}
          {...a11yProps(1)}
        />
      </Tabs>
    </AppBar>
  );
};

export default NavigationPanel;
