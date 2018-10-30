import React, { Component } from "react";
import { withRouter } from "react-router";
import {Post} from "./Post.js";
import { Route, Redirect, Link } from "react-router-dom";
import firebase from 'firebase';
class Dashboard extends Component {
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
            currentUser: ''
        };
        if(firebase.auth().currentUser!=null){
            this.state.currentUser = firebase.auth().currentUser.email;
        }
    }

    signout(){
        firebase.auth().signOut();
    }

    render() {
        if (firebase.auth().currentUser===null) {
            console.log("Not login yet!!!!");
            return (
                <Redirect to="/login"/>
            )
        }
        else{
            return(
                <div>
                    <Link to="/login">Need to switch account?</Link>
                    <br/>
                    <Link to="/signUp">Need an account?</Link>
                    <br/>
                    <Link to="/login" onClick={this.signout}>Sign out</Link>
                    <br/>
                    <br/>
                    <p>Welcome, {this.state.currentUser}! Ready to post a question ? </p>

                    <Post db={firebase} currentUser={this.state.currentUser}/>


                </div>
            )


        }

    }

}

export default withRouter(Dashboard);