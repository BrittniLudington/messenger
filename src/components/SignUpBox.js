import React,{Component} from 'react';

export default class SignUp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            name:"",
            password:"",
            sent: false
        }
        this.handleSignin = this.handleSignin.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);

        this.handleClosing = this.handleClosing.bind(this);
    }

    handleSignin(e)
    {
        e.preventDefault();
        this.setState({sent:true});
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
                <input type="submit" value="Register account"/>
                <p>If the input is invalid, a popup will show stating that either the username or password is invalid.</p>
            </form>
            </section>

        );
    }

    nameChanged(e)
    {
        this.setState({name:e.target.value});
    }

    passwordChanged(e)
    {
        this.setState({password:e.target.value});
    }
}