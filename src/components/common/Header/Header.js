import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles from './Header.module.css'

const Header = ({ fontSize = "36px", color = "#000000", fontWeight = "400", children }) => {

  return (
    <Box className={styles.header}>
      <Typography style={{ fontSize, color, fontWeight }} variant="h4" color="primary">
        {children}
      </Typography>
    </Box>
  );

}

export default Header;