import React from 'react';
import {Link} from 'react-router-dom';
import '../style/navbarstyle.css';

function Navbar()
{
    return (
        <section aria-label = "navbar" className = "navbar">
            <Link to = {'./userpage/test'} className = "entry">My Page</Link>
            <Link to = {'./login'} className = "entry">Sign out</Link>
            <form aria-label = "search">
                <input type = "text"/>
                <input type = "submit"/>
            </form>
        </section>
    );
}

export default Navbar;