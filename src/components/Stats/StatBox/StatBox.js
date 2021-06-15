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


const StatBox = ({
  title,
  loading = true,
  children,
  index = 1,
  color = "#555555",
  border = false,
  xs = "auto"
}) => {

  return <Grid item xs={xs} style={{ flexGrow: 1 }}>
    <Grow
      in={!loading}
      style={{ transformOrigin: '0 0 0' }}
      timeout={(index) * 500}
    >
      <Paper className={paper} style={{
        border: border ? `1px solid ${color}` : "1px solid #dddddd",
        boxShadow: border ? "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 14%)" : "none"
      }}>

        {/* start upper */}
        <div className={upper} style={{ backgroundColor: border ? color : "#f5f5f5" }}>
          <div className={titleWrapper}>
            <Typography variant="h6" className={titleText} style={{ color: border ? "#ffffff" : color }}>
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