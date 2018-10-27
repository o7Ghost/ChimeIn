import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Redirect, Link } from "react-router-dom";
import firebase from 'firebase';
class ResetContainer extends Component {
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
        this.state = {
            email:""
        };
    }
    handleReset (event){
        event.preventDefault();
        try{
            firebase.auth().sendPasswordResetEmail(this.state.email);
        }catch(error){
            alert(error);
        }
        alert("If the email:"+this.state.email+ " is registered, an email for resetting password has been sent");
        this.props.history.push("/login");
    };

    render() {
        return(
            <div>
                <h1>Reset password</h1>
                <label>Email</label>
                <input onChange= {e => this.setState({email: e.target.value})}/>
                <br />
                <button onClick={this.handleReset.bind(this)}>Reset password</button>
            </div>
        );
    }
}

export default withRouter(ResetContainer);