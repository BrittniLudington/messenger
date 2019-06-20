import React,{Component} from 'react';
import '../style/messagestyle.css';
export default class MessageBox extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            message:""
        }
    }

    render()
    {
        return(
            <section aria-label = "message area" className="messageBox">
            <h1>MessageBox</h1>
            <textarea rows="7" cols="50"></textarea>
            <button>Send</button>
            </section>

        );
    }
}