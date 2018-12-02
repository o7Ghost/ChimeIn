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
            var time = new Date();
            // var time2 = new Date("2018-11-20T03:55:42.242Z");
            // console.log(time-time2);
            var firebaseRef = firebase.database().ref("User");
            console.log("Signed up at:"+time.toJSON());
            console.log("uid:"+firebase.auth().currentUser.uid);
            firebaseRef.child(firebase.auth().currentUser.uid).set({lastPostTime: time.toJSON(), micOff: time.toJSON(), 
            projectorOff: time.toJSON(), writing: time.toJSON(), coolDown: time.toJSON()});

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