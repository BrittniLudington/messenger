import React,{Component} from 'react';
import '../style/searchstyle.css';
import MessageBox from './messageBox';
import Modal from 'react-awesome-modal';
import dataCollector from './dataCollect';

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
            results:null
        }
        this.handleReply = this.handleReply.bind(this);
        this.openMessage = this.openMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.showResults = this.showResults.bind(this);
        this.updateResults = this.updateResults.bind(this);
    }

    handleReply(e,name)
    {
        e.preventDefault();
        this.openMessage(name);
    }

    openMessage(name)
    {
        this.setState({writingMessage:true,receiver:name,closeMessenger:false});
    }

    closeMessage()
    {
        this.setState({writingMessage:false,closeMessenger:true});
    }

    updateResults(query)
    {
        console.log(query);
        this.setState({query:query},()=>
        {
            let r = dataCollector.getUsersByQuery(this.state.query);
            this.setState({results:r});
        });
    }

    showResults()
    {
        let numPerRow = 4;
        let rows = this.state.results.length % numPerRow;
        let users = this.state.results;
        let count = 0;
        let table = [];

        for(let i = 0; i < rows; i++)
        {
            let singleRow = [];

            for(let j = 0; j < numPerRow; j++)
            {
                if(count > users.length-1) break;
                let u = users[count];
                singleRow.push(<td key={users[count].id}>
                    <h2>{users[count].name}</h2>
                    <button onClick={(e)=>{this.handleReply(e,u.name)}}>send message</button>
                </td>);
                count++;
            }
            table.push(<tr key={i}>{singleRow}</tr>);
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
            return(<h1 aria-label="loading screen">Loading</h1>);
        }
        return (
            <section aria-label="search results">
            <Modal visible={this.state.writingMessage} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeMessage()}>
                        <div>
                            <MessageBox receiver={this.state.receiver} active={this.state.closeMessenger}/>
                            <a href="javascript:void(0);" onClick={() => this.closeMessage()}>Close</a>
                        </div>
                    </Modal>
                <h1>Results for {this.state.query}</h1>
            <table aria-label="users found in query">
                <tbody>
                {this.showResults()}
                </tbody>
                
            </table>
            </section>
        );
    }
}

export default SearchResults;