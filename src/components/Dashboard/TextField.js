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
            Question: '',
            upvoteCount: 0
        };

      this.firebaseRef = this.props.db.database().ref("UserQuestions");
    }
    
    componentWillUnmount() {
        this.firebaseRef.off();
    }
    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        console.log(this.state.Question)
        const {Question, upvoteCount} = this.state;
        event.preventDefault();
        if(Question != '') {
          this.firebaseRef.child(Question).set({Question: this.state.Question, upvoteCount: this.state.upvoteCount});
        }
        this.setState({Question: '', upvoteCount: 0});
    }
/*
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
*/

  render() {
    {var s = '\n';
    console.log(s.charCodeAt(0));}
    
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        
        <TextField value = { this.state.Question }
          id="outlined-multiline-flexible"
          label="Type Your Question"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
          onChange = {e => this.setState({Question: (e.target.value).replace(/\n/g, '_b')})} />
       
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