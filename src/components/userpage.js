import React,{Component} from 'react';
import '../style/userstyle.css';
import MessageBox from './messageBox';
import Modal from 'react-awesome-modal';
import dataCollector from './dataCollect';
export default class userPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            writingMessage: false,
            currentMessage: "",
            receiver: null,
            id: '1'
        }
        this.handleReply = this.handleReply.bind(this);
        this.openMessage = this.openMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.showInbox = this.showInbox.bind(this);
    }

    showInbox()
    {
        let messages = dataCollector.getRelatedMessages(this.state.id);
        let userIds = messages.map((m) =>
        {
            return m.from;
        })
        let users = dataCollector.getUsers(userIds);
        console.log(users);
        let html = messages.map((message) =>
        {
            return(<li>
                <h3>From: </h3>
                <h4>Sent: 6:15pm 6/14/19</h4>
                <p>What do you think of this app? Weird huh?</p>
                <button>reply</button>
            </li>);
        });

        return html;
    }
    
    openMessage()
    {
        this.setState({writingMessage:true});
    }

    closeMessage()
    {
        this.setState({writingMessage:false});
    }

    render()
    {
        return(<section aria-label="user page">
        <Modal visible={this.state.writingMessage} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeMessage()}>
                    <div>
                        <MessageBox/>
                        <a href="javascript:void(0);" onClick={() => this.closeMessage()}>Close</a>
                    </div>
                </Modal>
        <h1>Username Here</h1>
        <h2>You have 3 unread messages:</h2>
        <ul aria-label = "example mail">
            {this.showInbox()}
        </ul>
        </section>);
    }

    handleReply(e,name)
    {
        e.preventDefault();
        this.setState({writingMessage:true,receiver:name},()=>console.log(this.state.writingMessage));
    }
}