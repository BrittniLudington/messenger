import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import '../style/navbarstyle.css';

class Navbar extends Component
{
    render()
    {
        let query = "";
        function handleChange(newQuery)
        {
            query = newQuery.target.value;
        }
        console.log(this.props);
        return (
            <section aria-label = "navbar" className = "navbar">
                <Link to = {'/user/test'} className = "entry">My Page</Link>
                <Link to = {'/login'} className = "entry">Sign out</Link>
                <form aria-label = "search" onSubmit={(e) => handleSearch(e, query,this.props)}>
                    <input type = "text"  onChange={handleChange}/>
                    <input type = "submit"/>
                </form>
            </section>
        );
    }

}

function handleSearch(e, query,props)
{
    e.preventDefault();
    return <Redirect to={`/search/${query}`}/>;
}

export default Navbar;