import React,{Component} from 'react';
import TokenService from '../services/token-service';
import Server from '../services/fetch-service';

export default class SignUp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            name:"",
            password:"",
            sent: false,
            nameValid: false,
            passwordValid: false
        }
        this.handleSignin = this.handleSignin.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.isValid = this.isValid.bind(this);
        this.handleClosing = this.handleClosing.bind(this);
    }

    handleSignin(e)
    {
        e.preventDefault();
        TokenService.saveToken({name:this.state.name,password:this.state.password});
        this.setState({sent:true});
        //console.log(token,window.btoa(token),window.atob(window.btoa(token)));
        console.log(this.props);
        Server.registerUser().then(()=>{
            this.props.urlStuff.history.push(`/user/MyPage`);
        });

    }

    handleClosing()
    {
        this.setState({sent:false});
    }


    render()
    {
        if(this.props.active && this.state.sent)
        {
            this.handleClosing();
        }
        if(this.state.sent)
        {
            return(<section aria-label = "signup area" className="messageBox">
            <h1>Signup successful!</h1>
            </section>
            );
        }


        return(
            <section aria-label = "signup area" className="messageBox">
            <h2>Sign Up</h2>
            <form id = "loginForm" onSubmit={(e) =>this.handleSignin(e)}>
                <label htmlFor="true" name="username">Username:</label>
                <input onChange={(e)=>this.nameChanged(e)} type="text" name="username" className="block"/>
                <label htmlFor="true" name="password">Password:</label>
                <input onChange={(e)=>this.passwordChanged(e)} type="text" name="password" className="block"/>
                <input type="submit" value="Register account" disabled={!this.isValid()}/>
                <p>If the input is invalid, a popup will show stating that either the username or password is invalid.</p>
            </form>
            </section>

        );
    }

    nameChanged(e)
    {
        if(e.target.value === "")
            this.setState({name:e.target.value,nameValid:false});
        else
            this.setState({name:e.target.value,nameValid:true});

    }

    isValid()
    {
        return this.state.nameValid && this.state.passwordValid;
    }

    passwordChanged(e)
    {
        if(e.target.value === "")
            this.setState({password:e.target.value,passwordValid:false});
        else
            this.setState({password:e.target.value,passwordValid:true});

    }
}