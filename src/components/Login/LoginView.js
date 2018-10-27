import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
const LogInView = ({ onSubmit }) => {
    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                </label>
                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </label>
                <button type="submit">Log in</button>
                <br/>
                <Link to="/reset">Forget password?Need to reset password?</Link>
                <br/>
                <Link to="/signUp">Need an account?</Link>
            </form>
        </div>
    );
};

export default LogInView;