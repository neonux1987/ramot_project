import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles from './Header.module.css'

const Header = ({ bgColor = "rgb(44, 183, 197)", fontSize = "26px", color = "#ffffff", fontWeight = "400", children }) => {

  return (
    <Box className={styles.header}>
      {/* <Box style={{
        width: "64px",
        height: "64px",
        background: "url('https://sfilev2.f-static.com/image/users/441204/departAlbum/441204/normal/4252487.jpg') no-repeat",
        backgroundSize: "cover",
        borderRadius: "4px",
        boxShadow: "0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03)",
        border: "4px solid #e4e4e4"
      }}>

      </Box> */}
      <Box className={styles.titleWrapper} style={{backgroundColor: bgColor }}>
        <Typography style={{ color, fontWeight, fontSize }} variant="h5" color="primary">
          {children}
        </Typography>
      </Box>
    </Box>
  );

}

export default Header;