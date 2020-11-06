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
import { SettingsInputComposite } from '@material-ui/icons';

// STYLES
import styles from './Services.module.css'

// COMPONENTS
import LoadingCircle from '../../../../components/LoadingCircle';

// ACTIONS
import { startService, stopService, fetchServices, restartService } from '../../../../redux/actions/servicesActions';
import StyledExpandableSection from '../../../../components/Section/StyledExpandableSection';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: "4px"
    }
});

export default props => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const services = useSelector(store => store.services);

    const {
        isFetching,
        data
    } = services;

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    if (isFetching) {
        return <LoadingCircle loading={isFetching} />
    }

    const keys = Object.keys(data);

    const serviceToggleHandler = (service) => {
        if (service.enabled) {
            dispatch(stopService(service.serviceName));
        }
        else
            dispatch(startService(service.serviceName));
    }

    const restartServiceHandler = (serviceName) => {
        dispatch(restartService(serviceName));
    }

    const renderServices = keys.map((key, index) => {
        const {
            serviceNameHeb,
            serviceName,
            enabled
        } = data[key];
        return <ServiceRow
            name={serviceName}
            nameHeb={serviceNameHeb}
            enabled={enabled}
            key={index}
            serviceToggleHandler={serviceToggleHandler}
            restartServiceHandler={restartServiceHandler}
        />
    });

    return (
        <StyledExpandableSection
            title={"שירותי מערכת"}
            TitleIcon={SettingsInputComposite}
            padding={"30px 20px 70px"}
            iconColor={"#0365a2"}
        >

            <TableContainer className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={styles.header}>
                        <TableRow>
                            <TableCell className={styles.tableCellHeader}>שירות</TableCell>
                            <TableCell className={styles.tableCellHeader} align="center">סטטוס</TableCell>
                            <TableCell size="small" className={styles.tableCellHeader} style={{ width: "250px" }} align="center">פעולות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderServices}
                    </TableBody>
                </Table>
            </TableContainer>

        </StyledExpandableSection >
    );
}

const ServiceRow = ({ name, nameHeb, enabled, serviceToggleHandler, restartServiceHandler }) => {

    const btnActionText = enabled ? "הפסק" : "הפעל";
    const btnActionTextStyle = !enabled ? "green" : "red";

    const statusTextStyle = enabled ? "#5baf5b" : "#e44242";
    const status = enabled ? "פעיל" : "הופסק";

    return <TableRow>
        <TableCell className={styles.tableCell} component="th" scope="row">
            {nameHeb}
        </TableCell>
        <TableCell className={styles.tableCell} style={{ width: "200px" }} align="center">
            <div className={styles.statusTextWrapper} style={{ background: statusTextStyle }}>{status}</div>
        </TableCell>
        <TableCell className={styles.tableCell} style={{ width: "250px" }} align="center">
            <Button className={styles.btn} variant="contained" onClick={() => restartServiceHandler(name)}>אתחל</Button>
            <Button className={styles.btn} style={{ marginRight: "10px", color: btnActionTextStyle }} variant="contained" onClick={() => serviceToggleHandler({ serviceName: name, enabled })}>{btnActionText}</Button>
        </TableCell>
    </TableRow>;
}