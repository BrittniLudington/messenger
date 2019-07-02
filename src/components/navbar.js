import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import '../style/navbarstyle.css';
import TokenService from '../services/token-service';
import Server from '../services/fetch-service';

class Navbar extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            query:"",
            redirect:false,
            isLoggedIn:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.accountPrivs = this.accountPrivs.bind(this);
    }

    accountPrivs()
    {
        if(this.state.isLoggedIn)
        {
            return (<div aria-label="super secret account stuff">
            <Link to = {'/user/MyPage'} className = "entry">My Page</Link>
            <Link to = {'/login'} onClick={(e)=>signOut(e)} className = "entry">Sign out</Link></div>);
        }
    }

    componentDidMount()
    {
        Server.getUser().then(res=>
            {
                if(res === false)
                    this.setState({isLoggedIn:false});
                else
                    this.setState({isLoggedIn:true});
            })
    }

    render()
    {

        if(this.state.redirect)
        {
            this.setState({redirect:false});
            return(<section aria-label = "navbar" className="navbar">
                        {this.accountPrivs()}
                <form aria-label = "search" onSubmit={(e) => this.handleSearch(e, this.state.query,this.props)}>
                    <input type = "text"  onChange={this.handleChange}/>
                    <input type = "submit" value="Search"/>
                </form>
                <Redirect to ={`/search/${this.state.query}`}></Redirect>
            </section>);
        }
        return (
            <section aria-label = "navbar" className = "navbar">
                    {this.accountPrivs()}
                <form aria-label = "search" onSubmit={(e) => this.handleSearch(e, this.state.query,this.props)}>
                    <input type = "text"  onChange={this.handleChange}/>
                    <input type = "submit" value="Search"/>
                </form>
            </section>
        );
    }

    handleChange(newQuery)
        {
            this.setState({query:newQuery.target.value});
        }

        handleSearch(e, query,props)
        {
            e.preventDefault();

            this.setState({redirect:true});
        }
        

}

function signOut(e)
{
    e.preventDefault();
    TokenService.removeToken();
}

export default Navbar;