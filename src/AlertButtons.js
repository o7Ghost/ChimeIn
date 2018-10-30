import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    display: 'none',
  },
});

function OutlinedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.button}>
        Mic is off
      </Button>
      <Button variant="outlined" color="primary" className={classes.button}>
        Projector is off
      </Button>
      <Button variant="outlined" color="primary" className={classes.button}>
        Can't read your hand writing
      </Button>
      <Button variant="outlined" color="primary" className={classes.button}>
        Slow down
      </Button>
      
    </div>
  );
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButtons);