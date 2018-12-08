import React, { Component } from 'react';
import './AppPage.css';
import firebase from 'firebase';
import {  Redirect} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard.js';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: purple,
    },
});
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
    signout() {
        firebase.auth().signOut();
    }
    render() {
        if (!this.props || !this.props.authenticated) {
            return (
                <Redirect to="/login" />
            )
        }
        else {
            return (

                <div>
                    <Dashboard />
                </div>
            )
        }
    }
}

export default AppPage;
