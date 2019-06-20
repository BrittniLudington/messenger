import React,{Component} from 'react';
import '../style/messagestyle.css';
export default class MessageBox extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            message:"",
            sent: false
        }
        this.handleSend = this.handleSend.bind(this);
        this.messageChanged = this.messageChanged.bind(this);
        this.handleClosing = this.handleClosing.bind(this);
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
            return(<section aria-label = "message area" className="messageBox">
            <h1>Message Sent!</h1>
            </section>
            );
        }


        return(
            <section aria-label = "message area" className="messageBox">
            <h1>Send message to {this.props.receiver}?</h1>
            <textarea rows="7" cols="50" onChange={(e) => this.messageChanged(e)}></textarea>
            <button onClick={(e) =>(this.handleSend(e))}>Send</button>
            </section>

        );
    }

    messageChanged(e)
    {
        this.setState({message:e.target.value});
    }

    handleSend(e)
    {
        e.preventDefault();
        this.setState({sent:true});
    }
}