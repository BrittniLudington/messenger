import React,{Component} from 'react';
import '../style/userstyle.css';
import '../style/overall.css';
import MessageBox from './messageBox';
import Modal from 'react-awesome-modal';
import Server from '../services/fetch-service';
import Navbar from './navbar';

export default class userPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            writingMessage: false,
            receiver: null,
            receiverId: null,
            id: null,
            name: null,
            closeMessenger: false,
            messages: [],
            filter: 0 // 0 == show all, 1 == read, 2 == unread, 3 == sent by you
        }
        this.handleReply = this.handleReply.bind(this);
        this.openMessage = this.openMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.showInbox = this.showInbox.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.swapFilter = this.swapFilter.bind(this);
    }

    swapFilter(e,filter)
    {
        e.preventDefault();
        this.setState({filter:filter});
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

    }

    getMessages()
    {
        Server.getRelatedMessages(this.state.id).then(res=>
            {
                let inbox = [];
                let messages = res;
                let html;
                if(messages === undefined || messages.length < 1)
                {
                    html = <h2>Inbox Empty</h2>
                    return html;
                }
                messages.map((message) =>
                {
                    Server.getAUser(message.from).then(res =>
                        {
                            let from = window.atob(res.name);
                            if(res.id === this.state.id)
                                from = "You";
                            Server.getAUser(message.to).then(resTo =>
                                {
                                    inbox.push(
                                        {From: res.id,
                                        ToName: window.atob(resTo.name),
                                            FromName: from,
                                            header:window.atob(message.header),
                                        Sent: message.date,
                                        message: window.atob(message.subject),
                                        isRead:message.toread});
        
                                    this.setState({messages:inbox});
                                })
                            
        
                        })
                   
                });
            });
    }

    showInbox()
    {
            let key = 0;

                let html =  this.state.messages.map((message) =>
                {

                    let htmlpiece = (<li className="message" key={key}>
                        <h3>To: {message.ToName}</h3>
                        <h3>From: {message.FromName} </h3>
                        <h4>Sent: {message.Sent}</h4>
                        <h4>{message.header}</h4>
                        <p>{message.message}</p>
                        <button onClick={(e) => this.handleReply(e,message.FromName,message.From)}>reply</button>
                        </li>);
                    if(this.state.id === message.From)
                    {
                        htmlpiece = (<li className="message" key={key}>
                        <h3>To: {message.ToName}</h3>
                            <h3>From: {message.FromName} </h3>
                            <h4>Sent: {message.Sent}</h4>
                            <h4>{message.header}</h4>
                            <p>{message.message}</p>
                            </li>);
                    }
                    if(this.state.filter === 1)
                    {
                        if(message.isRead)
                        {
                            key++;
                            return htmlpiece;
                        }
                        return;
                    }
                    else if(this.state.filter === 2)
                    {
                        if(message.From !== this.state.id)//if(!message.isRead)
                        {
                            key++;
                            return htmlpiece;
                        }
                        return;
                    }
                    else if(this.state.filter === 3)
                    {

                        if(message.From === this.state.id)
                        {
                            key++;
                            return htmlpiece;
                        }
                        return;
                    }
                    key++;
                    return htmlpiece;

            });
            return html;           
    }
    
    openMessage(name,id)
    {
        this.setState({writingMessage:true,receiver:name,closeMessenger:false,receiverId:id});
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
            return(<section aria-label="page" >
            <Navbar />
            <section aria-label="user page"id="userPage">
            <Modal visible={this.state.writingMessage} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeMessage()}>
                        <div>
                            <MessageBox receiver={this.state.receiver} id={this.state.receiverId} active={this.state.closeMessenger}/>
                            <a href="javascript:void(0);" onClick={() => this.closeMessage()}>Close</a>
                        </div>
                    </Modal>
            <h1 id="username" className="Courgette">{this.state.name}</h1>
            <div aria-label="inbox">
            <ul aria-label="inbox filters" className="inline filterBox">
            <h2>Filters</h2>
                <li className="filters"><button className="filterButton" onClick={(e)=>{this.swapFilter(e,0)}}>All</button></li>
                <li className="filters"><button className="filterButton" onClick={(e)=>{this.swapFilter(e,2)}}>Received</button></li>
                <li className="filters"><button className="filterButton" onClick={(e)=>{this.swapFilter(e,3)}}>Sent</button></li>
            </ul>
            <ul aria-label = "example mail" className="inline mail Serif">
                {this.showInbox()}
            </ul>
            </div>

            </section>
            
            </section>);
        }
        
    }

    handleReply(e,name,id)
    {
        e.preventDefault();
        this.openMessage(name,id);
    }
}