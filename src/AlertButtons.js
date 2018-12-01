import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    display: 'none',
  },
});

class OutlinedButtons extends React.Component {
  constructor(props){  
  super(props);
   this.state = {
      open: false,
      loginTime : new Date()
    };
    this.enableNotice();
  }

  handleClick = () => {
 

    var time = new Date();
    this.firebaseRef = this.props.db.database().ref("ClassFinal");
    this.userRef = this.props.db.database().ref("User");

    this.classRef = this.firebaseRef.child(this.props.curClass);
    this.classRef.once('value', dataSnapshot => {
    console.log(dataSnapshot.val().instructor)
    this.userRef.child(dataSnapshot.val().instructor).update({alertTime: time.toJSON()})
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  enableNotice = () => {
    var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("alertTime");
    UserRef.on('value',(snapshot) => {
      var curTime = new Date();
      if(curTime - this.state.loginTime > 2000){
        this.setState({ open: true });
       // alert("An alert has been posted!");
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>

        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick}>Mic is off</Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick}>Projector is off</Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick}> Can't read your hand writing </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

      <Button variant="outlined" color="primary" className={classes.button}>
        Slow down
      </Button>

      </div>
    );
  }
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedButtons);