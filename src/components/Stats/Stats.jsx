import React from 'react';
import Grid from '@material-ui/core/Grid';
import Section from '../Section/Section';

const Stats = ({ stats }) => <Section>
  <Grid
    container
    spacing={2}
    style={{ padding: "0" }}
  >
    {stats || []}
  </Grid>
</Section>

export default Stats;