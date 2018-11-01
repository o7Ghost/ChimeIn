import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
  },
  button: {
    margin: '0 0 0 auto',
  }
});


class TextFields extends React.Component {
  constructor(props) {
    super(props);

        this.state = {
            Question: ''
        };

      this.firebaseRef = this.props.db.database().ref("UserQuestions");
    }
    
    componentWillUnmount() {
        this.firebaseRef.off();
    }
    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        const {Question} = this.state;
        event.preventDefault();
        this.firebaseRef.child(Question).set({Questions: this.state.Question});
        this.setState({Question: ''});
    }
/*
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
*/

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        
        <TextField
          id="outlined-textarea"
          label="Type Your Question"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
          onChange = { e => this.setState({Question: e.target.value})} />
       
       <Button variant="outlined" href="#" className={classes.button}
              onClick={this.pushToFirebase.bind(this)}>
        Submit
      </Button>
      </form>
      
    );
  }
  
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TextFields);