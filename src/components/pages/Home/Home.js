import React, { Component } from 'react';
import { withStyles, Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  titleBox: {
    background: "linear-gradient(60deg, #66bb6a, #43a047)",
    padding: "10px 20px",
    display: "inline-block",
    top: "-30px",
    left: "10px",
    position: "relative"
  },
  titleBoxText: {
    color: "#fff"
  },
  titleBoxExpanses: {
    color: "#000",
    fontSize: "24px"
  },
  box: {
    width: "370px",
    height: "150px",
    display: "inline-block",
    marginRight: "30px"
  },
  root: {
    paddingTop: "30px"
  }
})

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={this.props.classes.root}>

        <Paper className={this.props.classes.box} elevation={1}>
          <Paper className={this.props.classes.titleBox} elevation={1}>
            <Typography className={this.props.classes.titleBoxText} variant="h5" gutterBottom>
              לב תל אביב
                        </Typography>
          </Paper>

          <Typography className={this.props.classes.titleBoxExpanses} variant="h6" gutterBottom>
            סה"כ הוצאות: 33,456 שקל
                    </Typography>
        </Paper>

        <Paper className={this.props.classes.box} elevation={1}>
          <Paper className={this.props.classes.titleBox} elevation={1}>
            <Typography className={this.props.classes.titleBoxText} variant="h5" gutterBottom>
              מונטיפיורי 39
                        </Typography>
          </Paper>

          <Typography className={this.props.classes.titleBoxExpanses} variant="h6" gutterBottom>
            סה"כ הוצאות: 33,456 שקל
                    </Typography>
        </Paper>

        <Paper className={this.props.classes.box} elevation={1}>
          <Paper className={this.props.classes.titleBox} elevation={1}>
            <Typography className={this.props.classes.titleBoxText} variant="h5" gutterBottom>
              אלנבי 105
                        </Typography>
          </Paper>

          <Typography className={this.props.classes.titleBoxExpanses} variant="h6" gutterBottom>
            סה"כ הוצאות: 33,456 שקל
                    </Typography>
        </Paper>

        <Paper className={this.props.classes.box} elevation={1}>
          <Paper className={this.props.classes.titleBox} elevation={1}>
            <Typography className={this.props.classes.titleBoxText} variant="h5" gutterBottom>
              בית מוזס
                        </Typography>
          </Paper>

          <Typography className={this.props.classes.titleBoxExpanses} variant="h6" gutterBottom>
            סה"כ הוצאות: 33,456 שקל
                    </Typography>
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles)(Home);