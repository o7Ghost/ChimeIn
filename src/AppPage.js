import React, { Component } from 'react';
import './AppPage.css';
import {TeamMembers} from "./components/TeamMembers";
import {DisplayData} from './components/DisplayData.js';
import firebase from 'firebase';
import {Route, Redirect, Link} from 'react-router-dom';
import Login from './components/Login/LoginContainer' ;
class AppPage extends Component {
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
    signout(){
        firebase.auth().signOut();
    }
    render() {
        // if (!this.props || !this.props.authenticated){
        if( firebase.auth().currentUser===null){
            console.log("Not login yet!!!!");
            return(
                <Redirect to="/login" />
            )
        }
        else {
            console.log("login already!");
            return (
                <div>
                    <main>
                        <Link to="/login">Need to switch account?</Link>
                        <br/>
                        <Link to="/signUp">Need an account?</Link>
                        <br/>
                        <Link to="/login" onClick={this.signout}>Sign out</Link>
                        <br/>
                        <Link to="/dashboard">Ready to post a question?</Link>
                        <br/>
                    </main>
                    <TeamMembers db={firebase}/>
                    <DisplayData db={firebase}/>
                </div>
            )
        }
    }
}

export default AppPage;