import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';

import loginsignup from '../components/loginsignup';
import userPage from '../components/userpage';
import SearchResults from '../components/search';
import MessageBox from '../components/messageBox';
import Navbar from '../components/navbar';


describe('main pages render successfully',()=>
{
    it("login signup renders",()=>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(loginsignup,element);
        ReactDOM.unmountComponentAtNode(element);
    });

    it("user page renders",()=>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(userPage,element);
        ReactDOM.unmountComponentAtNode(element);
    });


});

describe('side components render successfully',()=>
{
    it("Message box on user page renders on active prop = false",() =>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(<MessageBox active="false"/>,element);
        ReactDOM.unmountComponentAtNode(element);
    })

    it("Message box on user page renders on active prop = true",() =>
    {
        const element = document.createElement('div');
    
        ReactDOM.render(<MessageBox active="true"/>,element);
        ReactDOM.unmountComponentAtNode(element);
    });

    it("Navbar renders",()=>
    {
        const element = document.createElement('div');
        
        ReactDOM.render(<BrowserRouter><Navbar/></BrowserRouter>,element);
        ReactDOM.unmountComponentAtNode(element);
    })
});