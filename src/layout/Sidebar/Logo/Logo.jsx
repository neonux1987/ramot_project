import React from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Logo = ({ handleDrawerClose }) => {
  return (
    <DrawerHeader>
      <Box style={{ flexGrow: 1, paddingRight: "15px" }}>
        <Typography variant='h5' >
          GuardBro
        </Typography>
      </Box>
      <IconButton onClick={handleDrawerClose}>
        <ChevronRightIcon />
      </IconButton>
    </DrawerHeader>
  );
}

export default Logo;
