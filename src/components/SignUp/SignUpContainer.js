import React, { Component } from "react";
import { withRouter } from "react-router";
import firebase from 'firebase';
import SignUpView from "./SignUpView";

class SignUpContainer extends Component {
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
                .createUserWithEmailAndPassword(email.value, password.value);
            this.props.history.push("/");
        } catch (error) {
            alert(error);
        }
    };

    render() {
        return <SignUpView onSubmit={this.handleSignUp} />;
    }
}

export default withRouter(SignUpContainer);