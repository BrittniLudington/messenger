import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import '../style/navbarstyle.css';

class Navbar extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            query:"",
            redirect:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    render()
    {
        if(this.state.redirect)
        {
            this.setState({redirect:false});
            return(<section aria-label = "navbar" className="navbar">
                        <Link to = {'/user/test'} className = "entry">My Page</Link>
                <Link to = {'/login'} className = "entry">Sign out</Link>
                <form aria-label = "search" onSubmit={(e) => this.handleSearch(e, this.state.query,this.props)}>
                    <input type = "text"  onChange={this.handleChange}/>
                    <input type = "submit" value="Search"/>
                </form>
                <Redirect to ={`/search/${this.state.query}`}></Redirect>
            </section>);
        }
        return (
            <section aria-label = "navbar" className = "navbar">
                <Link to = {'/user/test'} className = "entry">My Page</Link>
                <Link to = {'/login'} className = "entry">Sign out</Link>
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
            console.log("this should redirect");
            console.log(query);
            this.setState({redirect:true});
        }
        

}

export default Navbar;