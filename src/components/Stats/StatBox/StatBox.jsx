import React from 'react';
import { Grid, Grow, Paper, Typography } from '@material-ui/core';
import Spinner from '../../Spinner/Spinner';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';
import {
  paper
} from './StatBox.module.css';


const StatBox = ({
  loading = true,
  children,
  index = 1,
  color = "#000000",
  xs = true
}) => {

  return <Grid item xs={xs} style={{ flexGrow: 1 }}>
    <Grow
      in={!loading}
      style={{ transformOrigin: '0 0 0' }}
      timeout={(index) * 500}
    >
      <Paper className={paper} style={{ borderColor: color }}>

        {loading ? <Loader /> : children}

      </Paper>
    </Grow>
  </Grid >
}

export default StatBox;

const Loader = () => <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
  <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} size={20} /></AlignCenterMiddle>
</Grid>;