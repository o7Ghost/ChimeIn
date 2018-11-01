import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
//import App from './App';
import * as serviceWorker from './serviceWorker';
import '../src/bootstrap.min.css'
import App from './drawers';
=======
import AppPage from './AppPage';
import SignUp from './components/SignUp/SignUpContainer';
import Login from './components/Login/LoginContainer' ;
import Reset from './components/Reset/ResetContainer' ;
import PrivateRoute from './components/PrivateRoute';
import * as serviceWorker from './serviceWorker';
import {HashRouter,Route,Link} from 'react-router-dom';
import firebase from 'firebase';
>>>>>>> zik

class Index extends Component {
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
    state = { loading: true, authenticated: false, user: null };

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        });
    }

    render(){
        const { authenticated, loading } = this.state;

        if (loading) {
            return <p>Loading..</p>;
        }

        return (
            <HashRouter>
                <div>
                    <PrivateRoute exact path="/" component={AppPage} authenticated={this.state.authenticated}/>
                    <Route exact path="/app" component={AppPage} authenticated={this.state.authenticated}/>
                    <Route exact path="/reset" component={Reset} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                </div>
            </HashRouter >
        )
    }
}


ReactDOM.render(
    <Index />
, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
