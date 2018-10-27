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
                <Link to="/signUp">Need an account?</Link>
            </form>
        </div>
    );
};

export default LogInView;