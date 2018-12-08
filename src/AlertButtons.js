import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    input: {
        display: 'none',
    },
});

class OutlinedButtons extends React.Component {
    constructor(props) {
        super(props);
        this.statics = {
            alertcooldowntime: 180000,  // 180 000 = 3 minutes
            hovertime: 30000  // alert notification hover time
        };
        this.state = {
            mic: false,
            projector: false,
            write: false,
            coolD: false,
            loginTime: new Date(),

            notificationCleared: false,
            notificationRejected: false
        };
        this.profMicNotice();
        this.profProjectorNotice();
        this.profHandwritingNotice();
        this.profPaceNotice();
    }

    handleMicClick = () => {

        var time = new Date();
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        this.userRef = this.props.db.database().ref("User");

        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.classRef.once('value', dataSnapshot => {
            this.userRef.child(dataSnapshot.val().instructor).once('value', profSnapshot => {
                if ((new Date() - new Date(profSnapshot.val().micOff)) > this.statics.alertcooldowntime) {
                    this.userRef.child(dataSnapshot.val().instructor).update({ micOff: time.toJSON() });
                    this.setState({ notificationCleared: true });
                }
                else {
                    this.setState({ notificationRejected: true });
                }
            });
        });
    };

    handleProjectorClick = () => {

        var time = new Date();
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        this.userRef = this.props.db.database().ref("User");

        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.classRef.once('value', dataSnapshot => {
            this.userRef.child(dataSnapshot.val().instructor).once('value', profSnapshot => {
                if ((new Date() - new Date(profSnapshot.val().projectorOff)) > this.statics.alertcooldowntime) {
                    this.userRef.child(dataSnapshot.val().instructor).update({ projectorOff: time.toJSON() });
                    this.setState({ notificationCleared: true });
                }
                else {
                    this.setState({ notificationRejected: true });
                }
            });
        });
    };

    handleWritingClick = () => {

        var time = new Date();
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        this.userRef = this.props.db.database().ref("User");

        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.classRef.once('value', dataSnapshot => {
            this.userRef.child(dataSnapshot.val().instructor).once('value', profSnapshot => {
                if ((new Date() - new Date(profSnapshot.val().writing)) > this.statics.alertcooldowntime) {
                    this.userRef.child(dataSnapshot.val().instructor).update({ writing: time.toJSON() });
                    this.setState({ notificationCleared: true });
                }
                else {
                    this.setState({ notificationRejected: true });
                }
            });
        });
    };

    handlePaceClick = () => {

        var time = new Date();
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        this.userRef = this.props.db.database().ref("User");

        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.classRef.once('value', dataSnapshot => {

            this.userRef.child(dataSnapshot.val().instructor).once('value', profSnapshot => {
                if ((new Date() - new Date(profSnapshot.val().coolDown)) > this.statics.alertcooldowntime) {
                    this.userRef.child(dataSnapshot.val().instructor).update({ coolDown: time.toJSON() });
                    this.setState({ notificationCleared: true });
                }
                else {
                    this.setState({ notificationRejected: true });
                }
            });
        });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({
            mic: false, projector: false, write: false, coolD: false, notificationCleared: false,
            notificationRejected: false
        });
    };

    profMicNotice = () => {
        var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("micOff");
        UserRef.on('value', (snapshot) => {
            var curTime = new Date();
            if (curTime - this.state.loginTime > 1000) {
                this.setState({ mic: true, projector: false, write: false, coolD: false });
            }
        });
    }

    profProjectorNotice = () => {
        var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("projectorOff");
        UserRef.on('value', (snapshot) => {
            var curTime = new Date();
            if (curTime - this.state.loginTime > 1000) {
                this.setState({ mic: false, projector: true, write: false, coolD: false });
            }
        });
    }

    profHandwritingNotice = () => {
        var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("writing");
        UserRef.on('value', (snapshot) => {
            var curTime = new Date();
            if (curTime - this.state.loginTime > 1000) {
                this.setState({ mic: false, projector: false, write: true, coolD: false });
            }
        });
    }

    profPaceNotice = () => {
        var UserRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid).child("coolDown");
        UserRef.on('value', (snapshot) => {
            var curTime = new Date();
            if (curTime - this.state.loginTime > 1000) {
                this.setState({ mic: false, projector: false, write: false, coolD: true });
            }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.uType == 'student' ?
                // rendering of alert buttons
                <div>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={this.handleMicClick}>Mic is off</Button>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={this.handleProjectorClick}>Projector is off</Button>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={this.handleWritingClick}> Can't read your hand writing </Button>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={this.handlePaceClick}> Slow Down </Button>
                </div>
                : null}


                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.mic}
                    autoHideDuration={this.statics.hovertime}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">Professor, your mic is off.</span>}
                    action={[
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={this.handleClose}
                        >
                            Sure!
                        </Button>,
                    ]}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.projector}
                    autoHideDuration={this.statics.hovertime}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">Professor, the projector is not displaying correctly.</span>}
                    action={[
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={this.handleClose}
                        >
                            Sure!
                        </Button>,

                    ]}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.write}
                    autoHideDuration={this.statics.hovertime}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id"> Hey Professor, students can't read your hand writing </span>}
                    action={[
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={this.handleClose}
                        >
                            Sure!
                        </Button>,
                    ]}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.coolD}
                    autoHideDuration={this.statics.hovertime}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id"> Please slow down a little bit. Students can't follow up </span>}
                    action={[
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={this.handleClose}
                        >
                            Sure!
                        </Button>,

                    ]}
                />


                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.notificationCleared}
                    autoHideDuration={this.statics.hovertime}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id"> Your alert has been successfully sent to professor :) </span>}
                    action={[
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={this.handleClose}
                        >
                            Thanks!
                        </Button>,

                    ]}
                />

                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.notificationRejected}
                    autoHideDuration={this.statics.hovertime}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id"> You alert failed to send.
                        Professor has received the same alert within {this.statics.alertcooldowntime / 60000} minute.
                        Please try again later :( </span>}
                    action={[
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={this.handleClose}
                        >
                            Understood!
                        </Button>,

                    ]}
                />

            </div>
        );
    }
}

OutlinedButtons.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedButtons);
