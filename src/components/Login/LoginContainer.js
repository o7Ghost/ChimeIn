import React, { Component } from "react";
import LogInView from "./LoginView";
import { withRouter } from "react-router";
import { Route, Redirect, Link } from "react-router-dom";
import firebase from 'firebase';



class LogInContainer extends Component {
    constructor(props) {
        super(props);
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
    }
    handleSignUp = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            const user = await firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            this.props.history.push("/");
        } catch (error) {
            alert(error);
        }
    };
    
    render() {
        return <LogInView onSubmit={this.handleSignUp} />;
    }
}

export default withRouter(LogInContainer);