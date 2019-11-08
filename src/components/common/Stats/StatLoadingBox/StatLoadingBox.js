import React from 'react';
import { Box } from '@material-ui/core';
import styles from './StatLoadingBox.module.css';
import Spinner from '../../Spinner/Spinner';

export default ({title})=>{
    return (
        <Box 
        className={styles.wrapper}
        display="flex" 
        justifyContent="center"
        alignItems="center"
        >
            <Spinner style={{ fontWeight: 600 }} loadingText={title} size={20} />
        </Box>
    );
}