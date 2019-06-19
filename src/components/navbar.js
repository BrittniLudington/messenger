import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import '../style/navbarstyle.css';

class Navbar extends Component
{
    constructor(props)
    {
        super(props);
        console.log(props);
        this.state = 
        {
            query:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    render()
    {
        
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
            return (<h1>HELLO</h1>);//<Redirect to={`/login`}/>;
        }
        

}

export default Navbar;