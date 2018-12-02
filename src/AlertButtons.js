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
      mic: false,
      projector: false,
      write: false,
      coolD: false,
      loginTime : new Date()
    };
    this.enableNotice1();
    this.enableNotice2();
    this.enableNotice3();
    this.enableNotice4();
  }

  handleClick1 = () => {
 
    var time = new Date();
    this.firebaseRef = this.props.db.database().ref("ClassFinal");
    this.userRef = this.props.db.database().ref("User");

    this.classRef = this.firebaseRef.child(this.props.curClass);
    this.classRef.once('value', dataSnapshot => {
    console.log(dataSnapshot.val().instructor)
    this.userRef.child(dataSnapshot.val().instructor).update({micOff: time.toJSON()})
    });
  };

  handleClick2 = () => {
 
    var time = new Date();
    this.firebaseRef = this.props.db.database().ref("ClassFinal");
    this.userRef = this.props.db.database().ref("User");

    this.classRef = this.firebaseRef.child(this.props.curClass);
    this.classRef.once('value', dataSnapshot => {
    console.log(dataSnapshot.val().instructor)
    this.userRef.child(dataSnapshot.val().instructor).update({projectorOff: time.toJSON()})
    });
  };

  handleClick3 = () => {
 
    var time = new Date();
    this.firebaseRef = this.props.db.database().ref("ClassFinal");
    this.userRef = this.props.db.database().ref("User");

    this.classRef = this.firebaseRef.child(this.props.curClass);
    this.classRef.once('value', dataSnapshot => {
    console.log(dataSnapshot.val().instructor)
    this.userRef.child(dataSnapshot.val().instructor).update({writing: time.toJSON()})
    });
  };

  handleClick4 = () => {
 
    var time = new Date();
    this.firebaseRef = this.props.db.database().ref("ClassFinal");
    this.userRef = this.props.db.database().ref("User");

    this.classRef = this.firebaseRef.child(this.props.curClass);
    this.classRef.once('value', dataSnapshot => {
    console.log(dataSnapshot.val().instructor)
    this.userRef.child(dataSnapshot.val().instructor).update({coolDown: time.toJSON()})
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ mic: false, projector: false, write: false, coolD: false });
  };

  enableNotice1 = () => {
    var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("micOff");
    UserRef.on('value',(snapshot) => {
      var curTime = new Date();
      if(curTime - this.state.loginTime > 1000){
        this.setState({ mic: true, projector: false, write: false, coolD: false });
      }
    });
  }

  enableNotice2 = () => {
    var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("projectorOff");
    UserRef.on('value',(snapshot) => {
      var curTime = new Date();
      if(curTime - this.state.loginTime > 1000){
        this.setState({ mic: false, projector: true, write: false, coolD: false });
      }
    });
  }

  enableNotice3 = () => {
    var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("writing");
    UserRef.on('value',(snapshot) => {
      var curTime = new Date();
      if(curTime - this.state.loginTime > 1000){
        this.setState({ mic: false, projector: false, write: true, coolD: false });
      }
    });
  }

  enableNotice4 = () => {
    var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("coolDown");
    UserRef.on('value',(snapshot) => {
      var curTime = new Date();
      if(curTime - this.state.loginTime > 1000){
        this.setState({ mic: false, projector: false, write: false, coolD: true });
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>

        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick1}>Mic is off</Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.mic}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Mic is off</span>}
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

        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick2}>Projector is off</Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.projector}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Projector is off</span>}
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

        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick3}> Can't read your hand writing </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.write}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> Can't read your hand writing </span>}
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

        <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick4}> Slow Down </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.coolD}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> Can't read your hand writing </span>}
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

      </div>
    );
  }
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedButtons);