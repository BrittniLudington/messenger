import React,{Component} from 'react';
import '../style/userstyle.css';
import MessageBox from './messageBox';
import Modal from 'react-awesome-modal';
import dataCollector from './dataCollect';
import Server from '../services/fetch-service';
export default class userPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            writingMessage: false,
            receiver: null,
            id: null,
            name: null,
            closeMessenger: false
        }
        this.handleReply = this.handleReply.bind(this);
        this.openMessage = this.openMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.showInbox = this.showInbox.bind(this);
    }

    componentDidMount()
    {
        let user = dataCollector.getUsers(['1']);
        this.setState({id:user[0].id,name:user[0].name});
    }

    showInbox()
    {
        let messages = dataCollector.getRelatedMessages(this.state.id);
        let userIds = messages.map((m) =>
        {
            return m.from;
        })
        let users = dataCollector.getUsers(userIds);
        let key = 0;
        let html = messages.map((message) =>
        {
            let name ="name not found";
            for(let i = 0; i < users.length; i++)
            {
                if(message.from === users[i].id)
                    name = users[i].name;
            }
            key++;
            return(<li key={key}>
                <h3>From: {name} </h3>
                <h4>Sent: {message.date}</h4>
                <p>{message.subject}</p>
                <button onClick={(e) => this.handleReply(e,name)}>reply</button>
            </li>);
        });

        return html;
    }
    
    openMessage(name)
    {
        this.setState({writingMessage:true,receiver:name,closeMessenger:false});
    }

    closeMessage()
    {
        this.setState({writingMessage:false,closeMessenger:true});
    }

    render()
    {
        if(!this.state.name || !this.state.id)
        {
            return(<section aria-label="user loading">
                <h1>Loading...</h1>
            </section>);
        }
        else
        {
            return(<section aria-label="user page">
            <Modal visible={this.state.writingMessage} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeMessage()}>
                        <div>
                            <MessageBox receiver={this.state.receiver} active={this.state.closeMessenger}/>
                            <a href="javascript:void(0);" onClick={() => this.closeMessage()}>Close</a>
                        </div>
                    </Modal>
            <h1>{this.state.name}</h1>
            <div aria-label="inbox">
            <ul aria-label="inbox filters" className="inline filterBox">
            <h2>Filters</h2>
                <li className="filters"><button>All</button></li>
                <li className="filters"><button>Read</button></li>
                <li className="filters"><button>Unread</button></li>
                <li className="filters"><button>Sent</button></li>
            </ul>
            <ul aria-label = "example mail" className="inline mail">
                {this.showInbox()}
            </ul>
            </div>

            </section>);
        }
        
    }

    handleReply(e,name)
    {
        e.preventDefault();
        this.openMessage(name);
    }
}