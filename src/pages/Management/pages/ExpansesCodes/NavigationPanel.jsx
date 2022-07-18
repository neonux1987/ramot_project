import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

function a11yProps(index) {
  return {
    id: `expanses-codes-tab-${index}`,
    "aria-controls": `expanses-codes-tab-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "transparent",
    boxShadow: "none"
  },
  tab: {
    color: "#000000"
  }
}));

const NavigationPanel = ({ handleChange, value }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" classes={{ root: classes.root }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="expanses codes navigation panel"
      >
        <Tab
          classes={{ root: classes.tab }}
          label="קודי הנהלת חשבונות"
          {...a11yProps(0)}
        />
        <Tab
          classes={{ root: classes.tab }}
          label="הגדרת ברירת מחדל"
          {...a11yProps(1)}
        />
      </Tabs>
    </AppBar>
  );
};

export default NavigationPanel;
