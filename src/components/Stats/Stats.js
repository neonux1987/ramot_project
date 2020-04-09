import React from 'react';
import styles from './Stats.module.css';
import { Box } from '@material-ui/core';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default ({ stats, columns = 4 }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: false,
    arrows: false
  };

  return (
    <Box
    //className={styles.wrapper} 
    //style={{ gridTemplateColumns: `repeat(${columns},1fr)` }}
    >
      <Slider {...settings}>
        {stats || []}
      </Slider>
    </Box>
  );
}