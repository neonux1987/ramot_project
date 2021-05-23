import React from 'react';
import Grid from '@material-ui/core/Grid';

const Stats = ({ stats }) => <Grid
  container
  spacing={2}
  style={{ padding: "0 0 20px" }}
>
  {stats || []}
</Grid>

export default Stats;