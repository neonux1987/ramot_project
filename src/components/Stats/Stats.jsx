import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";

const Stats = ({ stats, spacing = 2 }) => (
  <Box
    id="stats"
    borderRadius="14px"
    bgcolor="#ffffff"
    spacing="2"
    //overflow="hidden"
  >
    <Grid container spacing={spacing} style={{ padding: "0" }}>
      {stats || []}
    </Grid>
  </Box>
);

export default Stats;
