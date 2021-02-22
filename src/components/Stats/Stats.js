import React from 'react';
import Grid from '@material-ui/core/Grid';

export default ({ stats }) => {
  return (
    <Grid
      container
      spacing={2}
      justify={"space-evenly"}
      style={{ padding: "20px 0" }}
    >
      {stats || []}
    </Grid>
  );
}