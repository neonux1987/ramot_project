import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const Stats = ({ stats, spacing = 2 }) => (
  <Box
    id="stats"
    boxShadow="rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem"
    border="1px solid #dddddd"
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
