import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const Stats = ({ stats }) => <Box style={{ backgroundColor: "#ffffff", padding: "15px", borderRadius: "0" }} >
  <Grid
    container
    spacing={2}
    style={{ padding: "0" }}
  >
    {stats || []}
  </Grid>
</Box>

export default Stats;