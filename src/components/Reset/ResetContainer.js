import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Redirect, Link } from "react-router-dom";
import firebase from 'firebase';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core";
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Image from '../../image/background.jpg';


const themePaper = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue,
    },
});

const styles = theme => ({
    "@global": {
        body: {
            backgroundImage: 'url(' + Image + ')',
            backgroundColor: "#ECEFF1",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "100%"
        },
        html: {
            height: "100%"
        },
        "#componentWithId": {
            height: "100%"
        }
    },
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: theme.spacing.unit * 18,
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    otherLinks: {
        padding: `${theme.spacing.unit * 2}px 0px ${theme.spacing.unit * 3}px`,
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',

    },
});

class ResetContainer extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        const { classes } = props;
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
        this.state = {
            email: ""
        };
    }
    handleReset(event) {
        event.preventDefault();
        try {
            firebase.auth().sendPasswordResetEmail(this.state.email);
        } catch (error) {
            alert(error);
        }
        alert("If the email:" + this.state.email + " is registered, an email for resetting password has been sent");
        this.props.history.push("/login");
    };

    render() {
        const { classes } = this.props.classes
        return (
            <div>
                <MuiThemeProvider theme={themePaper}>
                    <main className={this.props.classes.main}>
                        <Paper className={this.props.classes.paper}>
                            <h1>Reset password</h1>
                            <form className={this.props.classes.form}>
                            <FormControl margin="normal" required fullWidth>
         
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input onChange={e => this.setState({ email: e.target.value })} />
                                </FormControl>
                                <br />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.props.classes.submit}
                                    onClick={this.handleReset.bind(this)}
                                >
                                    Reset Password
          </Button>
                            </form>
                        </Paper>
                        <div className={this.props.classes.otherLinks}>
      <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
      <Link to="/login">Back to Login</Link>
      <Link to="/signUp">Not a Customer? Sign Up Now!</Link>
      </Grid>
      </div>
                    </main>
                </MuiThemeProvider>

            </div>
        );
    }
}

export default withStyles(styles)(withRouter(ResetContainer));