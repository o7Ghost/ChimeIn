import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
    },
    textField: {
        width: '70vw',
    },
    button: {
       
    }
});


class AnswerField extends React.Component {
    constructor(props) {
        super(props);
        this.firebaseRef = this.props.db.database().ref("UserQuestions");
    }
    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        console.log(this.props.value.Answer)
        console.log(this.props.Ans)
        const {Answer} = this.props.value;
        event.preventDefault();
        if(Answer != '') {
          this.firebaseRef.child(this.props.Question).update({ Answer: this.props.value.Answer });
        }
        this.props.stateChange({Answer: ''});
    }
    /*
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    */

    render() {
        {
            //var s = '\n';
            //console.log(s.charCodeAt(0));
        }

        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Type Your Answer"
                        placeholder="Placeholder"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange = {e => this.props.stateChange((e.target.value).replace(/\n/g, '_b'))}
                    />
                    </Grid>
                    <Grid>
                    <Button className={classes.button} size="small" color="primary" onClick={this.pushToFirebase.bind(this)}>
                        Answer
                    </Button>
                    </Grid>
                    
                </Grid>
                
                
            </form>

           

        );
    }

}

AnswerField.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AnswerField);