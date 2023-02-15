import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";

const Stats = ({ stats, spacing = 2 }) => (
  <Box
    id="stats"
    boxShadow="rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem"
    borderRadius="14px"
    bgcolor="#ffffff"
    //overflow="hidden"
  >
    <Grid container spacing={spacing} style={{ padding: "0" }}>
      {stats || []}
    </Grid>
  </Box>
);

export default Stats;
