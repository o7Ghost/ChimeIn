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


      this.firebaseRef = this.props.db.database().ref("UserQuestions");
    }
    
    componentWillUnmount() {
        this.firebaseRef.off();
    }
    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        console.log(this.props.value.Question)
        const {UID, Question, upvoteCount, Answer, timestamp} = this.props.value;
        event.preventDefault();
        var time = new Date();
        time = time.toJSON().split(".")[0];
        var cID = this.props.db.auth().currentUser.uid;

        if(Question != '') {
          this.firebaseRef.child( cID + "+" + time).set({UID: cID, 
            Question: Question, upvoteCount: upvoteCount, Answer: Answer, timestamp: time});
        }
        
        this.props.stateChange('');
    }
/*
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
*/
//, upvoteCount: this.props.value.upvoteCount
 //value= { this.props.value.Question.replace(/_b/g, '\n') }
  render() {
    {var s = '\n';
    console.log(s.charCodeAt(0));}
    
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField value = { this.props.value.Question.replace(/_b/g, '\n')}
          id="outlined-multiline-flexible"
          label="Type Your Question"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
          onChange = {e => this.props.stateChange((e.target.value).replace(/\n/g, '_b'))} 
	       onKeyPress={this._handleKeyPress}/>
       
       <Button variant="outlined" id="submitButton" href="#" className={classes.button}
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
