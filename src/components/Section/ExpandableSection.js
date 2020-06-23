// LIBRARIES
import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import Collapsible from 'react-collapsible';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

// CSS
import styles from './ExpandableSection.module.css';
import DefaultLoader from '../AnimatedLoaders/DefaultLoader';

export default ({
  TitleIcon,
  marginTop = "20px",
  marginBottom = "20px",
  children,
  iconBoxBg = "#0365a2",
  title,
  extraDetails,
  collapsable = true,
  bgColor = "initial",
  padding = "20px 15px 0 15px",
  loading = false,
  headerStyles = {}
}) => {

  const useStyles = makeStyles((theme) => ({
    contentInnerClassName: {
      padding,
      backgroundColor: bgColor
    }
  }));

  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const expandClick = () => {
    setOpen(!open);
  }

  const expandIcon = open ? <ExpandLess className={styles.expandIcon} /> : <ExpandMore className={styles.expandIcon} />

  const headerWrapper = () => {

    return (<div className={styles.wrapper} style={headerStyles}>

      <div className={styles.titleWrapper}>
        <div className={styles.iconBox} style={{ backgroundColor: iconBoxBg }}>
          {TitleIcon && <TitleIcon />}
        </div>
        <Typography className={styles.title}>
          {title}
        </Typography>
      </div>

      <div className={styles.extraDetailsWrapper}>
        {extraDetails && extraDetails()}
      </div>

      {collapsable && <div className={styles.expandIconWrapper} onClick={expandClick}>
        {expandIcon}
      </div>}

    </div>);
  }

  return (
    <Box className={styles.boxWrapper} mt={marginTop} mb={marginBottom} mx={"20px"}>
      <Collapsible
        transitionTime={100}
        open={open}
        triggerDisabled={true}
        trigger={headerWrapper() || ""}
        contentInnerClassName={classnames(classes.contentInnerClassName)}
      >
        {loading ? <DefaultLoader loading={loading} /> : children}
      </Collapsible>
    </Box>
  );

}