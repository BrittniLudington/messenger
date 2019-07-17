import React,{Component} from 'react';
import '../style/messagestyle.css';
import '../style/overall.css';
import Server from '../services/fetch-service';
export default class MessageBox extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            message:"",
            sent: false,
            to: null,
            header: ""
        }
        this.handleSend = this.handleSend.bind(this);
        this.messageChanged = this.messageChanged.bind(this);
        this.handleClosing = this.handleClosing.bind(this);
        this.headerChanged = this.headerChanged.bind(this);
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
            <section aria-label = "message area" className="messageBox Serif text">
            <h1>Send message to {this.props.receiver}?</h1>
            <label>Subject
                <textarea className="text Serif input" rows="1" cols="25" onChange={(e) => this.headerChanged(e)}></textarea>
            </label>
            <textarea className=" Serif text input" rows="4" cols="25" onChange={(e) => this.messageChanged(e)}></textarea>
            <button className="send" onClick={(e) =>(this.handleSend(e,this.props.id))}>Send</button>
            </section>

        );
    }

    messageChanged(e)
    {
        this.setState({message:e.target.value});
    }

    headerChanged(e)
    {
        this.setState({header:e.target.value})
    }

    handleSend(e,id)
    {
        e.preventDefault();

        Server.sendMessage(id,this.state.header,this.state.message);
            
        this.setState({sent:true});
    }
}