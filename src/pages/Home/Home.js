import React, { Component } from 'react';
import { withStyles, Paper, Typography } from '@material-ui/core';
//import InfoBox from '../../common/InfoBox/InfoBox';
import styles from './Home.module.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.wrapper}>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <h3>דף הבית נמצא בבנייה.</h3>
        </div>
        {/* <InfoBox wrapper={styles.infoBox} boxColor={"#f94c4c"}>
          <Paper className={styles.header} elevation={1}>
            <Typography variant="h5" className={styles.title} gutterBottom>
              לב תל אביב
        </Typography>
          </Paper>

          <Paper className={styles.body}>
            <Typography variant="h6" className={styles.expansesTitle} gutterBottom>
              סה"כ הוצאות: 33,456 שקל
        </Typography>
          </Paper>
        </InfoBox>

        <InfoBox wrapper={styles.infoBox} boxColor={"rgb(55, 156, 228)"}>
          <Paper className={styles.header} elevation={1}>
            <Typography variant="h5" className={styles.title} gutterBottom>
              מונטיפיורי 39
        </Typography>
          </Paper>

          <Paper className={styles.body}>
            <Typography variant="h6" className={styles.expansesTitle} gutterBottom>
              סה"כ הוצאות: 33,456 שקל
        </Typography>
          </Paper>
        </InfoBox>

        <InfoBox wrapper={styles.infoBox} boxColor={"rgb(169, 55, 228)"}>
          <Paper className={styles.header} elevation={1}>
            <Typography variant="h5" className={styles.title} gutterBottom>
              מונטיפיורי 39
        </Typography>
          </Paper>

          <Paper className={styles.body}>
            <Typography variant="h6" className={styles.expansesTitle} gutterBottom>
              סה"כ הוצאות: 33,456 שקל
        </Typography>
          </Paper>
        </InfoBox>

        <InfoBox wrapper={styles.infoBox} boxColor={"rgb(46, 185, 102)"}>
          <Paper className={styles.header} elevation={1}>
            <Typography variant="h5" className={styles.title} gutterBottom>
              מונטיפיורי 39
        </Typography>
          </Paper>

          <Paper className={styles.body}>
            <Typography variant="h6" className={styles.expansesTitle} gutterBottom>
              סה"כ הוצאות: 33,456 שקל
        </Typography>
          </Paper>
        </InfoBox> */}

      </div>
    );
  }
}

export default withStyles(styles)(Home);