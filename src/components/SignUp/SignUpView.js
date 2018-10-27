import React, { Component } from 'react';
class SignUpView extends Component {
    render(){
        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.props.onSubmit}>
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}
export default SignUpView;