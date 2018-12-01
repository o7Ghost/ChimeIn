import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
        <div className="App">
        <form className="form-signin" method="GET">
                <div className="form-signin">
                    <div className="mb-4">

                    </div>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input className="form-control" id="loginEmail" type="email" name="email" placeholder="Email address" required/>



                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input className="form-control" id="loginPassword" type="password" name="password" placeholder="Password"
                        required/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    
                    <button id="loginBtn" type="button" className="btn btn-lg btn-primary btn-block" onClick="login()">Login</button>
                    <p className="mt-5 mb-3 text-muted"> </p>
                    <button className="btn btn-lg btn-primary btn-block" value="Sign Up" onClick="location.href='signup.html'">Sign
                Up</button>
                </div>
            </form>
        </div>
    );
  }
}


export default App;
