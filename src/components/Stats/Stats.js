import React from 'react';
import styles from './Stats.module.css';
import { Box } from '@material-ui/core';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Slider from "react-slick";

export default ({ stats, columns = 4 }) => {
  return (
    <Box
      className={styles.wrapper}
      style={{ gridTemplateColumns: `repeat(${columns},1fr)` }}
    >
      {stats || []}
    </Box>
  );
}