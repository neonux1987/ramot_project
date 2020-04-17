// LIBRARIES
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// STYLES
import styles from './Services.module.css'

// COMPONENTS
import Section from '../../../../components/Section/Section';
import LoadingCircle from '../../../../components/LoadingCircle';

// ACTIONS
import { fetchSpecificSetting } from '../../../../redux/actions/settingsActions';
import { startService, stopService } from '../../../../redux/actions/servicesActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SERVICES = "services";

export default props => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const settings = useSelector(store => store.settings);
  console.log(settings);
  useEffect(() => {
    dispatch(fetchSpecificSetting(SERVICES));
  }, [dispatch]);

  if (settings.isFetching) {
    return <LoadingCircle loading={settings.isFetching} />
  }

  const { services } = settings.data;

  const keys = Object.keys(services);

  const toggleService = (service) => {
    if (service.enabled)
      dispatch(startService(service.serviceName));
    else
      dispatch(stopService(service.serviceName));
  }

  const renderServices = keys.map((key, index) => {
    const {
      serviceNameHeb,
      enabled
    } = services[key];
    return <ServiceRow
      name={serviceNameHeb}
      enabled={enabled}
      key={index}
      clickHandler={toggleService}
    />
  });

  return (
    <Section className={styles.container}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={styles.header}>
            <TableRow>
              <TableCell className={styles.tableCellHeader}>שירות</TableCell>
              <TableCell className={styles.tableCellHeader} align="right">סטטוס</TableCell>
              <TableCell size="small" className={styles.tableCellHeader} style={{ width: "250px" }} align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderServices}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
}

const ServiceRow = ({ name, enabled, clickHandler }) => {

  const btnActionText = enabled ? "הפסק" : "הפעל";
  const btnActionTextStyle = !enabled ? "green" : "red";

  const statusTextStyle = enabled ? "green" : "red";
  const status = enabled ? "מופעל" : "מופסק";

  return <TableRow>
    <TableCell className={styles.tableCell} component="th" scope="row">
      {name}
    </TableCell>
    <TableCell className={styles.tableCell} align="right" style={{ color: statusTextStyle }}>{status}</TableCell>
    <TableCell className={styles.tableCell} style={{ width: "250px" }} align="center">
      <Button className={styles.btn} variant="contained">אתחל</Button>
      <Button className={styles.btn} style={{ marginRight: "10px", color: btnActionTextStyle }} variant="contained" onClick={() => clickHandler({ serviceName: name, enabled })}>{btnActionText}</Button>
    </TableCell>
  </TableRow>;
}