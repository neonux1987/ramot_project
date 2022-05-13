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
  wrapper,
  subtitle1Wrapper,
  subtitle2Wrapper,
  appVersionWrapper,
  versionText
} from './Logo.module.css';

//ELECTRON
const appVersion = require("electron").remote.app.getVersion();

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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
            <div className={subtitle1Wrapper}>
              <Typography className={subtitle} variant="subtitle1">
                מערכת לניהול
              </Typography>
            </div>

            <div className={subtitle2Wrapper}>
              <Typography className={subtitle} variant="subtitle1">
                תקציבי בניינים
              </Typography>
            </div>

            <div className={appVersionWrapper}>
              <Typography className={versionText} variant="subtitle1">
                {`v${appVersion}`}
              </Typography>
            </div>
          </div>

        </div>
        {/* end wrapper */}

      </div>
    </div>
  );
}

export default Logo;
