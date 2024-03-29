import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TransferSideList from "./TransferSideList";
import CenteredLoader from "../AnimatedLoaders/CenteredLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

const TransferList = ({
  handleCheckedLeft,
  handleCheckedRight,
  rightChecked,
  leftChecked,
  rightItems,
  leftItems,
  handleToggleAll,
  handleToggle,
  numberOfChecked,
  checked,
  isFetching,
  rightTitle,
  leftTitle
}) => {
  const classes = useStyles();

  if (isFetching) return <CenteredLoader />;

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <TransferSideList
          title={rightTitle}
          items={rightItems}
          handleToggleAll={handleToggleAll}
          handleToggle={handleToggle}
          numberOfChecked={numberOfChecked}
          checked={checked}
          keyName={"code"}
          valueName={"codeName"}
        />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected right"
          >
            {">"}
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected left"
          >
            {"<"}
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <TransferSideList
          title={leftTitle}
          items={leftItems}
          handleToggleAll={handleToggleAll}
          handleToggle={handleToggle}
          numberOfChecked={numberOfChecked}
          checked={checked}
          keyName={"code"}
          valueName={"codeName"}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(TransferList);
