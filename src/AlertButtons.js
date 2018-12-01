import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import amber from '@material-ui/core/colors/amber';



const styles = theme => ({
  root:{
    backgroundColor: amber[700],
  },
  button: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    
  },
  input: {
    display: 'none',
  },
});

class OutlinedButtons extends React.Component {
 state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

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
            "aria-describedby": "message-id",
            classes:{
              root: classes.root
            }
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
           
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
        className={classes.root}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
            classes:{
              root: classes.root
            }
          }}
          message={<span id="message-id">Note archived</span>}
          action={[

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
        className={classes.root}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
            classes:{
              root: classes.root
            }
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            
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