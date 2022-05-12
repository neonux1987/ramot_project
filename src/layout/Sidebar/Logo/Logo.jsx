import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

// CSS
import {
  logoImgContainer,
  subtitle,
  container,
  logo,
  subContainer,
  wrapper
} from './Logo.module.css';

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    minHeight: "unset !important"
  }
}));

const Logo = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.drawerHeader}>
      <div className={container}>

        {/* wrapper */}
        <div className={wrapper}>

          <div className={logoImgContainer}>
            <div className={logo} />
          </div>

          <div className={subContainer}>
            <Typography className={subtitle} variant="subtitle1">
              INCOME OUTCOME MANAGEMENT
            </Typography>
          </div>

        </div>
        {/* end wrapper */}

        {children}

      </div>
    </div>
  );
}

export default Logo;
