import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

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

        this.statics = {
            cooldowntime: 60000  // change this field to change cooldown time
        };

        this.state = {
            buttonDisabled: false,
            open: false,
            notification: '',
            submitText: 'Submit'
        };

        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        var classRef = this.firebaseRef.child(this.props.curClass);
        var questionRef = classRef.child("questions");
        this.firebaseRef=questionRef;

        // cooldown implementation on page opening
        var userRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid);
        userRef.once('value', (snapshot) => {

            var posttime = '2000-01-01T00:00:59.207Z'
            snapshot.val().lastPostTime ? posttime = new Date(snapshot.val().lastPostTime) :  posttime = '2000-01-01T00:00:59.207Z'

            //var posttime = new Date(snapshot.val().lastPostTime);
            var curTime = new Date();

            var diff = curTime - posttime;
            //console.log("xxxxooooooo"+ posttime);
            if(diff < this.statics.cooldowntime && diff > 0) {
                this.state.buttonDisabled = true;
                this.state.submitText = 'You can post another question within 60 seconds.';
                setTimeout(() => this.setState({ buttonDisabled: false, submitText: 'Submit' }), (this.statics.cooldowntime - diff));
            }
        });
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        const {UID, Question, upvoteCount, order, Answer, timestamp, followers} = this.props.value;
        //event.preventDefault();
        var time = new Date();
        var timeWithTimezone = time.toJSON();
        time = time.toJSON().split(".")[0];
        var cID = this.props.db.auth().currentUser.uid;

        if(Question != '' && this.state.buttonDisabled == false) {
            this.firebaseRef.child( cID + "+" + time).set({UID: cID,
                Question: Question, upvoteCount: upvoteCount, order:order, timestamp: time, followers: this.props.value.followers});

            // update user lastPostTime
            var userRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid);
            userRef.update({lastPostTime: timeWithTimezone});

            // after this submission, set button disabled with timeout function, 1s = 1000
            this.setState({buttonDisabled: true, submitText: 'You can post another question within 60 seconds.'});
            setTimeout(() => this.setState({ buttonDisabled: false, submitText: 'Submit' }), this.statics.cooldowntime);
        }
        else if(Question == '' && this.state.buttonDisabled == false) {
            this.state.notification = 'Can not submit blank question';
            this.state.open = true;
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

    _handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            if(this.state.buttonDisabled == false) {
                this.pushToFirebase();
                this.setState({Question: '', upvoteCount: 0});
            }
            else {
                this.setState({notification: 'You can post another question within 60 seconds.', open: true});
            }
        }
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };


//, upvoteCount: this.props.value.upvoteCount
    //value= { this.props.value.Question.replace(/_b/g, '\n') }
    render() {
        {var s = '\n';
        console.log("in text field", this.props.curClass);}
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.questionRef = this.classRef.child("questions");
        this.firebaseRef=this.questionRef;


        const { classes } = this.props;
        return (
            <div>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField value = { this.props.value.Question}
                           id="outlined-multiline-flexible"
                           label="Type Your Question"
                           placeholder="Placeholder"
                           multiline
                           className={classes.textField}
                           margin="normal"
                           variant="outlined"
                           fullWidth
                           onChange = {e => this.props.stateChange((e.target.value))}
                           onKeyPress={this._handleKeyPress}/>

                <Button variant="outlined" id="submitButton" href="#" className={classes.button}
                        onClick={this.pushToFirebase.bind(this)} disabled={this.state.buttonDisabled}>
                    {this.state.submitText}
                </Button>
            </form>

                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.open}
                    autoHideDuration={4500}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">{this.state.notification}</span>}
                    // action={[
                    //     <Button
                    //         key="undo"
                    //         color="secondary"
                    //         size="small"
                    //         onClick={this.handleClose}
                    //     >
                    //         Close
                    //     </Button>,
                    //     <IconButton
                    //         key="close"
                    //         aria-label="Close"
                    //         color="inherit"
                    //         className={classes.close}
                    //         onClick={this.handleClose}
                    //     >
                    //         <CloseIcon />
                    //     </IconButton>
                    // ]}
                />
            </div>
        );
    }

}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
