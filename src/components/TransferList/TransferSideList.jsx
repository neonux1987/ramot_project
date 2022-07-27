import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  cardHeaderTitle: {
    fontSize: "24px",
    color: "#000000"
  },
  list: {
    width: 300,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  }
}));

const TransferSideList = ({
  title,
  items,
  handleToggleAll,
  handleToggle,
  numberOfChecked,
  checked,
  keyName,
  valueName
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        classes={{ title: classes.cardHeaderTitle }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} פריטים שנבחרו`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((item) => {
          const labelId = `transfer-list-all-item-${item[keyName]}-label`;

          return (
            <ListItem
              key={item[keyName] + 1}
              role="listitem"
              button
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item[valueName]} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
};

export default TransferSideList;
