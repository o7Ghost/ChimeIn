import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

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
        Questions: ''
      };
      var config = {
        apiKey: "AIzaSyDAxqzZLvyW64VLMhvxTxQjMubdntruWE0",
        authDomain: "cse110firebase-498ba.firebaseapp.com",
        databaseURL: "https://cse110firebase-498ba.firebaseio.com",
        projectId: "cse110firebase-498ba",
        storageBucket: "",
        messagingSenderId: "155811445994"
      };
      if (!firebase || !firebase.apps.length) {
        firebase.initializeApp(config);
      }
      this.firebaseRef = firebase.ref("tQuestion");
    }
    
    componentWillUnmount() {
        this.firebaseRef.off();
    }
    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        const {Questions} = this.state;
        event.preventDefault();
        this.firebaseRef.child(Questions).set({Questions: this.state.Questions});
        this.setState({Questions: ''});
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