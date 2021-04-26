import React from 'react';
import { Grid, Grow, Paper, Typography } from '@material-ui/core';
import Spinner from '../../Spinner/Spinner';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';
import {
  paper,
  upper,
  titleWrapper,
  titleText,
  bottom,
} from './StatBox.module.css';


const StatBox = ({ title, loading = true, children, index = 1, headerBgColor = "#0e7ab9" }) => {

  return <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
    <Grow
      in={!loading}
      style={{ transformOrigin: '0 0 0' }}
      timeout={(index) * 400}
    >
      <Paper className={paper} >

        {/* start upper */}
        <div className={upper} style={{ backgroundColor: headerBgColor }}>
          <div className={titleWrapper}>
            <Typography variant="h6" className={titleText}>
              {title}
            </Typography>
          </div>

        </div>
        {/* end upper */}

        {/* start bottom */}
        <div className={bottom}>
          {loading ? <Loader /> : children}
        </div>
        {/* end bottom */}

      </Paper>
    </Grow>
  </Grid >
}

export default StatBox;

const Loader = () => <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
  <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} size={20} /></AlignCenterMiddle>
</Grid>;