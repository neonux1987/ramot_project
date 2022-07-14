import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTheme } from "@material-ui/core";
//import { getAppVersion } from "../../../services/mainProcess.svc";

// CSS
import {
  logoImgContainer,
  subtitle,
  container,
  logo,
  subContainer,
  wrapper,
  subtitle1Wrapper,
  //subtitle2Wrapper,
  //appVersionWrapper,
  //versionText,
  mainTitle,
  mainTitleWrapper
} from "./Logo.module.css";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    minHeight: "unset !important"
  }
}));

const Logo = () => {
  const classes = useStyles();
  const { main } = useTheme().palette.primary;
  /* const [version, setVersion] = useState(""); */

  /* useEffect(async () => {
    setVersion(await getAppVersion());
  }, []); */

  return (
    <div className={classes.drawerHeader}>
      <div className={container}>
        {/* wrapper */}
        <div className={wrapper}>
          <div className={logoImgContainer}>
            <div className={logo} style={{ backgroundColor: main }} />
            <div className={mainTitleWrapper}>
              <Typography className={mainTitle} variant="subtitle1">
                קבוצת רמות
              </Typography>
            </div>
          </div>

          <div className={subContainer}>
            <div className={subtitle1Wrapper}>
              <Typography className={subtitle} variant="subtitle1">
                מערכת לניהול תקציבי בניינים
              </Typography>
            </div>

            {/* <div className={appVersionWrapper}>
              <Typography className={versionText} variant="subtitle1">
                {`Version: ${version}`}
              </Typography>
            </div> */}
          </div>
        </div>
        {/* end wrapper */}
      </div>
    </div>
  );
};

export default Logo;
