import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Spinner from '../../Spinner/Spinner';
import { AlignCenterMiddle } from '../../AlignCenterMiddle/AlignCenterMiddle';
import {
  paper,
  upper,
  titleWrapper,
  titleText,
  bottom,
} from './StatBox.module.css';


const StatBox = ({ title, titleColor = "#555555", loading = true, children }) => {

  return <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
    <Paper className={paper} >

      {/* start upper */}
      <div className={upper}>
        <div className={titleWrapper}>
          <Typography variant="h6" className={titleText} /* style={{ color: titleColor }} */>
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
  </Grid >
}

export default StatBox;

const Loader = () => <Grid item xs={"auto"} style={{ flexGrow: 1 }}>
  <AlignCenterMiddle><Spinner loadingText={"טוען נתונים"} size={20} /></AlignCenterMiddle>
</Grid>;