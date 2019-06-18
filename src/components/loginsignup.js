import React, {Component} from 'react';
import '../style/loginstyle.css'

export default class loginsignup extends Component
{
    render()
    {
        return ( <section aria-label = "login">
                    <header aria-label="app title">
            <h1>Private Messaging</h1>
            <p>Name subject to change</p>
            </header>
            <div aria-label="log in">
            <h2>Log in</h2>
            <form id = "loginForm">
                <label htmlFor="true" name="username">Username:</label>
                <input type="text" name="username" className="block"/>
                <label htmlFor="true" name="password">Password:</label>
                <input type="text" name="password" className="block"/>
                <input type="submit" value="Log in"/>
                <p>If the input is invalid, a popup will show stating that either the username or password is invalid.</p>
            </form>
            </div>
            <p>Don't have an account? Sign up for one here</p>
            <p>NOTE: This button will not do anything in the wireframe. The sign up form will be similar to the login form</p>
            <button>Sign Up</button>
        </section>

        );
    }
}