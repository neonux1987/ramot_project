import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import styles from './ExpandableSection.module.css';
import Collapsible from 'react-collapsible';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

export default ({
  TitleIcon,
  marginTop = "20px",
  marginBottom = "20px",
  children,
  iconBoxBg,
  title,
  extraDetails,
  collapsable = true,
  bgColor = "initial",
  padding = "20px 0 0"
}) => {

  const useStyles = makeStyles((theme) => ({
    contentInnerClassName: {
      padding,
    },
    classParentString: {
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

    const displayExpandIcon = collapsable ? <div className={styles.expandIconWrapper} onClick={expandClick}>
      {expandIcon}
    </div> : null;

    return (<div className={styles.wrapper}>

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
    <Box mt={marginTop} mb={marginBottom} mx={"20px"}>
      <Collapsible
        transitionTime={100}
        open={open}
        triggerDisabled={true}
        trigger={headerWrapper() || ""}
        classParentString={classes.classParentString}
        contentInnerClassName={classnames(classes.contentInnerClassName)}
      >
        {children}
      </Collapsible>
    </Box>
  );

}