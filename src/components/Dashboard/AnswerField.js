import React from 'react';
import PropTypes from 'prop-types';
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
        this.state = { answer: '' }
    }

    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        var firebaseRef = this.props.db.database().ref("ClassFinal");
        var classRef = firebaseRef.child(this.props.curClass);
        var questionRef = classRef.child("questions");
        var answerRef = questionRef.child(this.props.Question);


        let answerA = []
        answerRef.on('value', (snapshot) => {
            const question = snapshot.val();
            if (question != null && question.Answer) {
                answerA = question.Answer;
            }
        })
        answerA.push(this.state.answer);
        const { Answer } = this.state;
        event.preventDefault();
        if (Answer !== '') {
            answerRef.update({ Answer: answerA });
        }
        this.setState({ answer: '' });
    }

    render() {
        {

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

                    <TextField value={this.state.answer}
                        id="outlined-multiline-flexible"
                        label="Type Your Answer"
                        placeholder="Placeholder"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={e => this.setState({ answer: e.target.value })}
                    />

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