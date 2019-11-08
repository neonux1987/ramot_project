import React from 'react';
import styles from './Stats.module.css';
import {Box} from '@material-ui/core';

export default ({stats}) => {
  return (
    <Box className={styles.wrapper}>
      {stats}
    </Box>
  );
}