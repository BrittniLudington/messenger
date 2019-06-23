import React, {Component} from 'react';
import '../style/loginstyle.css'
import Modal from 'react-awesome-modal';
import SignUp from './SignUpBox';


export default class loginsignup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            signup:false,
            closeSignup:false,
            username:null,
            password:null
        }
        this.openMessage = this.openMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
    }

    openMessage(e)
    {
        e.preventDefault();
        this.setState({signup:true,closeSignup:false});
    }

    closeMessage()
    {
        this.setState({signup:false,closeSignup:true});
    }
    render()
    {
        return ( <section aria-label = "login">
                    <header aria-label="app title">
            <h1>Private Messaging</h1>
            <p>Name subject to change</p>
            </header>
            <Modal visible={this.state.signup} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeMessage()}>
                        <div>
                            <SignUp active={this.state.closeSignup}/>
                            <a href="javascript:void(0);" onClick={() => this.closeMessage()}>Close</a>
                        </div>
            </Modal>
            <div aria-label="log in">
            <h2>Log in</h2>
            <form id = "loginForm" onSubmit={(e) =>handleLogin(e, this.props)}>
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
            <button onClick={(e)=>this.openMessage(e)}>Sign Up</button>
        </section>

        );
    }
}

function handleLogin(e,props)
{
    e.preventDefault();
    props.history.push(`/user/test`);

}