import React,{Component} from 'react';
import '../style/searchstyle.css';
import '../style/overall.css';
import MessageBox from './messageBox';
import Modal from 'react-awesome-modal';
import Server from '../services/fetch-service';
import Navbar from './navbar';


class SearchResults extends Component
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
            query:null,
            results:null,
            idToSend: null
        }
        this.handleReply = this.handleReply.bind(this);
        this.openMessage = this.openMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.showResults = this.showResults.bind(this);
        this.updateResults = this.updateResults.bind(this);
    }

    componentDidMount()
    {
            Server.getUser().then(res=>
            {
                if(res === false)
                {
                    this.props.history.push('/login');
                }
                else
                {
                    let name = window.atob(res.name);
                    let id = res.id;
                    this.setState({id:id,name:name});
                }

            });

    }

    handleReply(e,name, id)
    {
        e.preventDefault();
        this.openMessage(name, id);
    }

    openMessage(name,id)
    {
        this.setState({writingMessage:true,receiver:name,closeMessenger:false,idToSend:id});
    }

    closeMessage()
    {
        this.setState({writingMessage:false,closeMessenger:true,idToSend:null});
    }

    updateResults(query)
    {

        this.setState({query:query},()=>
        {
            if(query === undefined)
            {
                Server.getAllUsers().then(r =>
                    {
                        let res = r;
                        for(let i = 0; i < res.length; i++)
                        {
                            res[i].name = window.atob(res[i].name);
                        }
                        this.setState({results:res})
                    })
            }
            else
            {
                Server.getUsersByQuery(this.state.query).then(r =>
                    {

                        let res = r;
                        for(let i = 0; i < res.length; i++)
                        {
                            res[i].name = window.atob(res[i].name);
                        }
                        this.setState({results:res});
                    });
            }
            
        });
    }

    showResults()
    {
        let users = this.state.results;
        let table = [];

        for(let i = 0; i < users.length; i++)
        {
            table.push(<li key = {users[i].id} className="aUser">
            <h2 className="Serif username">{users[i].name}</h2>
                    <button className="Serif userButton" onClick={(e)=>{this.handleReply(e,users[i].name, users[i].id)}}>send message</button>
            </li>)
        }
     
        return table;
    }
    render()
    {
        let newQuery = this.props.match.params.username;
        if(newQuery !== this.state.query)
        {
            this.updateResults(newQuery);
        }
        if(this.state.results === null)
        {
            return(<section aria-label="search results">
            <Navbar/>
            <h1 aria-label="loading screen">Loading</h1>
            </section>);
        }
        let result = this.state.query;
        if(result === undefined)
            result = '*';
        return (
            <section aria-label="search results">
            <Navbar/>
            <Modal visible={this.state.writingMessage} width="400" height="400" effect="fadeInUp" onClickAway={() => this.closeMessage()}>
                        <div>
                            <MessageBox id={this.state.idToSend} receiver={this.state.receiver} active={this.state.closeMessenger}/>
                            <a href="javascript:void(0);" id="closeSend" onClick={() => this.closeMessage()}>Close</a>
                        </div>
                    </Modal>
            <section aria-label="main" className="results">
                <h1 className="Courgette query">Results for {result}</h1>
                {this.state.results.length === 0 ? <h2 className="Serif">No accounts of {this.state.query} found</h2> : ""}
                <ul aria-label = "users found in query" className="allResults">
                {this.showResults()}
                </ul>
            </section>

            </section>
        );
    }
}



export default SearchResults;