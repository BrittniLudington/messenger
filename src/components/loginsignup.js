import React, {Component} from 'react';
import '../style/loginstyle.css'
import '../style/overall.css'

import Modal from 'react-awesome-modal';
import SignUp from './SignUpBox';
import Server from '../services/fetch-service';
import TokenService from '../services/token-service';


export default class loginsignup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            signup:false,
            closeSignup:false,
            username:"",
            password:"",
            invalid: false,
            loggingIn:false
        }
        this.openMessage = this.openMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillMount()
    {
        let info = TokenService.getCleanToken();
        if(info !== null)
        {
            this.setState({username:info[0],password:info[1]});
        }
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

    updateName(event)
    {
        this.setState({username:event.target.value,invalid:false});
    }

    updatePassword(event)
    {
        this.setState({password:event.target.value, invalid:false});
    }
    render()
    {
        return ( <section aria-label = "login" id="loginSection">
                    <header aria-label="app title" className="Courgette">
            <h1 id="title">Private Messaging</h1>
            </header>
            <Modal visible={this.state.signup} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeMessage()}>
                        <div>
                            <SignUp active={this.state.closeSignup} urlStuff={this.props}/>
                            <a href="javascript:void(0);" id="closeSignUp" className="Serif text" onClick={() => this.closeMessage()}>Close</a>
                        </div>
            </Modal>
            <div aria-label="log in">
            <h2>Log in</h2>
            <form id = "loginForm" className="Serif" onSubmit={(e) =>this.handleLogin(e, this.props)}>
                <label htmlFor="true" name="username">Username:</label>
                <input type="text" name="username" className="block input" value={this.state.username} onChange={(e)=>this.updateName(e)}/>
                <label htmlFor="true" name="password">Password:</label>
                <input type="text" name="password" className="block input" value={this.state.password} onChange={(e)=>this.updatePassword(e)}/>
                <input type="submit" className="loginScreenButton Serif" value="Log in"/>
            </form>
            {this.state.loggingIn ? <h3>Loading..</h3>:null}
            {this.state.invalid ? <h2>Username/Password incorrect!</h2>:null}
            </div>
            <p className="Serif">Don't have an account? Sign up for one here</p>
            <button onClick={(e)=>this.openMessage(e)} className="loginScreenButton Serif">Sign Up</button>

            <h3 id="aboutLink" className="Courgette">ABOUT</h3>
            <section aria-label="about" id="about" className="Serif">
                <h2>A private messaging app!</h2>
                <p>Send private messages to other users where only they and you can see it. Signup using only a username and password, nothing else required.</p>
            </section>
        </section>

        );
    }

    handleLogin(e,props)
    {
        e.preventDefault();
        this.setState({loggingIn:true});
        TokenService.saveToken({name:this.state.username,password:this.state.password});

        Server.getUser().then(result=>
        {
            if(!result)
            {
                this.setState({invalid:true,loggingIn:false});
                return;
            }
            props.history.push(`/user/MyPage`);

        })

    }
}

