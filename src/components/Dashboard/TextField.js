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


        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        var classRef = this.firebaseRef.child(this.props.curClass);
        var questionRef = classRef.child("questions");
        this.firebaseRef=questionRef;
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }
    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        const {UID, Question, upvoteCount, order, Answer, timestamp, followers} = this.props.value;
        //event.preventDefault();
        var time = new Date();
        time = time.toJSON().split(".")[0];
        var cID = this.props.db.auth().currentUser.uid;

        if(Question != '') {
            this.firebaseRef.child( cID + "+" + time).set({UID: cID,
                Question: Question, upvoteCount: upvoteCount, order:order, timestamp: time, followers: this.props.value.followers});
            var userRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid);
            userRef.set({lastPostTime: time});
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
            this.pushToFirebase();
            e.preventDefault();
            this.setState({Question: '', upvoteCount: 0});
        }
    }


//, upvoteCount: this.props.value.upvoteCount
    //value= { this.props.value.Question.replace(/_b/g, '\n') }
    render() {
        {var s = '\n';
        console.log("in text field", this.props.curClass);}
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.questionRef = this.classRef.child("questions");
        this.firebaseRef=this.questionRef;

        var lastPostDate = null;
        var hour = null;
        var minute = null;
        var second = null;
        var userRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid);
        userRef.on('value', (snapshot) => {
            var posttime = snapshot.val().lastPostTime;
            lastPostDate = posttime.split("T")[0];
            const lastPostTime = posttime.split("T")[1];
            hour = lastPostTime.split(":")[0];
            minute = lastPostTime.split(":")[1];
            var temp = lastPostTime.split(":")[2];
            second = temp.split("Z")[0];
            console.log("aaaaaaa" + hour + minute + second);
        });
        console.log("xxxxxxxx" + lastPostDate);

        var time = new Date();
        time = time.toJSON().split(".")[0];
        var curPostDate = time.split("T")[0];
        var curhour = time.split(":")[0];
        var curminute = time.split(":")[1];
        var cursecond = time.split(":")[2].split("Z")[0];


        var timeTooShort = 0;
        if(cursecond == second) {

        }

        const { classes } = this.props;
        return (
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
