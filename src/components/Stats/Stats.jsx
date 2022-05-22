import React from 'react';
import Grid from '@material-ui/core/Grid';
import Section from '../Section/Section';

const Stats = ({ stats }) => <Section style={{ backgroundColor: "#ffffff", padding: "15px", borderRadius: "0" }}>
  <Grid
    container
    spacing={2}
    style={{ padding: "0" }}
  >
    {stats || []}
  </Grid>
</Section>

export default Stats;