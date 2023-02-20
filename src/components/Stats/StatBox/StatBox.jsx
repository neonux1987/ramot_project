import { Fade, Grid, Paper } from "@material-ui/core";
import React from "react";
import { AlignCenterMiddle } from "../../AlignCenterMiddle/AlignCenterMiddle";
import Spinner from "../../Spinner/Spinner";
import { paper } from "./StatBox.module.css";

const StatBox = ({
  loading = true,
  children,
  index = 1,
  color = "#000000",
  xs = true
}) => {
  return (
    <Grid item xs={xs} style={{ flexGrow: 1 }}>
      <Fade
        in={!loading}
        style={{ transformOrigin: "0 0 0" }}
        timeout={(index / 2) * 800}
      >
        <Paper className={paper} style={{ borderColor: color }}>
          {loading ? <Loader /> : children}
        </Paper>
      </Fade>
    </Grid>
  );
};

export default StatBox;

const Loader = () => (
  <Grid item xs={"auto"} style={{ flexGrow: 1, height: "280px" }}>
    <AlignCenterMiddle>
      <Spinner loadingText={"טוען נתונים"} size={20} />
    </AlignCenterMiddle>
  </Grid>
);
