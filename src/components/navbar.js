import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import '../style/navbarstyle.css';
import '../style/overall.css'
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
            isLoggedIn:false,
            redirectTo:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.accountPrivs = this.accountPrivs.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    accountPrivs()
    {
        //if(this.state.isLoggedIn)
        //{
            return (<div aria-label="super secret account stuff">
            <Link to = {'/user/MyPage'} className = "entry">My Page</Link>
            <Link to = {'/login'} onClick={(e)=>this.signOut(e)} className = "entry">Sign out</Link></div>);
        //}
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
            return(<section aria-label = "navbar" className="navbar Serif">
                        <Link to = {'/user/MyPage'} className = "entry">My Page</Link>
            <Link to = {'/login'} onClick={(e)=>this.signOut(e)} className = "entry">Sign out</Link>
                <form aria-label = "search" onSubmit={(e) => this.handleSearch(e, this.state.query,this.props)}>
                    <input type = "text"  onChange={this.handleChange}/>
                    <input type = "submit" className="searchButton" value="Search"/>
                </form>
                <Redirect to ={this.state.redirectTo}></Redirect>
            </section>);
        }
        return (
            <section aria-label = "navbar" className = "navbar Serif">
                    <Link to = {'/user/MyPage'} className = "entry">My Page</Link>
            <Link to = {'/login'} onClick={(e)=>this.signOut(e)} className = "entry">Sign out</Link>
                <form aria-label = "search" onSubmit={(e) => this.handleSearch(e, this.state.query,this.props)}>
                    <input type = "text"  onChange={this.handleChange}/>
                    <input type = "submit" className="searchButton" value="Search"/>
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

            this.setState({redirect:true,redirectTo:`/search/${this.state.query}`});
        }
        
    signOut(e)
    {
        e.preventDefault();
        TokenService.removeToken();
        this.setState({redirect:true,redirectTo:'/login'});
    }

}



export default Navbar;