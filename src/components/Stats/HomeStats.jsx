import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const HomeStats = ({ stats, spacing = 2 }) => (
  <Box id="stats">
    <Grid container spacing={spacing} style={{ padding: "0" }}>
      {stats || []}
    </Grid>
  </Box>
);

export default HomeStats;
