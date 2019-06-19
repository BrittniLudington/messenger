import React from 'react';
import '../style/searchstyle.css';
import Navbar from './navbar';
function SearchResults(props)
{
    return (
        <section aria-label="search results">
            <Navbar/>
            <h1>Results for *Query*</h1>
        <table aria-label="users found in query">
            <tbody>
            <tr>
                <td>
                    <h2>userOne</h2>
                    <button>send message</button>
                </td>
                <td>
                        <h2>userOne</h2>
                        <button>send message</button>
                </td>
                <td>
                        <h2>userOne</h2>
                        <button>send message</button>
                </td>
                <td>
                        <h2>userOne</h2>
                        <button>send message</button>
                </td>        
            </tr>
            <tr>
                    <td>
                            <h2>userOne</h2>
                            <button>send message</button>
                    </td>
                    <td>
                            <h2>userOne</h2>
                            <button>send message</button>
                    </td>
                        
            </tr>
            </tbody>
            
        </table>
        </section>
    );
}

export default SearchResults;