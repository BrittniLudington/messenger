import React,{Component} from 'react';
import '../style/userstyle.css';
import MessageBox from './messageBox';
import Modal from 'react-awesome-modal';
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
            closeMessenger: false,
            messages: []
        }
        this.handleReply = this.handleReply.bind(this);
        this.openMessage = this.openMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.showInbox = this.showInbox.bind(this);
        this.getMessages = this.getMessages.bind(this);
    }

    componentDidMount()
    {
            Server.getUser().then(res=>
            {
                //        props.history.push(`/user/MyPage`);
                if(res === false)
                {
                    this.props.history.push('/login');
                }
                else
                {
                    let name = window.atob(res.name);
                    let id = res.id;
                    this.setState({id:id,name:name},()=>this.getMessages()
                    );
                }

            });
        //let user = dataCollector.getUsers(['1']);
        //this.setState({id:user[0].id,name:user[0].name});
    }

    getMessages()
    {
        Server.getRelatedMessages(this.state.id).then(res=>
            {
                let inbox = [];
                let messages = res;
                console.log(messages);
                let html;
                if(messages === undefined || messages.length < 1)
                {
                    html = <h2>Inbox Empty</h2>
                    return html;
                }
                messages.map((message) =>
                {
                    inbox.push(
                        {From: message.header,
                            header:message.header,
                        Sent: message.date,
                        message: message.subject});

                });
                this.setState({messages:inbox});
            });
    }

    showInbox()
    {
            let key = 0;

                let html =  this.state.messages.map((message) =>
                {
                    let name ="name not found";
                    key++;
                    return (<li key={key}>
                        <h3>From: {message.From} </h3>
                        <h4>Sent: {message.Sent}</h4>
                        <p>{message.Subject}</p>
                        <button onClick={(e) => this.handleReply(e,name)}>reply</button>
                        </li>);
                    
                    /*Server.getAUser(message.from)
                    .then(user =>
                    {
                        console.log(user);
                        name = window.atob(user.name);
                        key++;
                        return(<li key={key}>
                            <h3>From: {name} </h3>
                            <h4>Sent: {message.date}</h4>
                            <p>{message.subject}</p>
                            <button onClick={(e) => this.handleReply(e,name)}>reply</button>
                            </li>);
                    }).then(()=> console.log(html));
                    */

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