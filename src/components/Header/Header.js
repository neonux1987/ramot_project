import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles from './Header.module.css'

const Header = ({ bgColor = "rgb(44, 183, 197)", fontSize = "26px", color = "#000000", fontWeight = "400", children }) => {

  return (
    <Box className={styles.header}>
      <Box>
        <Typography style={{ color, fontWeight, fontSize }} variant="h5" color="primary">
          {children}
        </Typography>
      </Box>
    </Box>
  );

}

export default Header;