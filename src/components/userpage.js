import React,{Component} from 'react';
import '../style/userstyle.css';
export default class userPage extends Component
{
    render()
    {
        return(<section aria-label="user page">
        <h1>Username Here</h1>
        <h2>You have 3 unread messages:</h2>
        <ul aria-label = "example mail">
            <li>
                <h3>From: ExUser002</h3>
                <h4>Sent: 6:15pm 6/14/19</h4>
                <p>What do you think of this app? Weird huh?</p>
                <button>reply</button>
            </li>
            <li>
                    <h3>From: Barradafd</h3>
                    <h4>Sent: 3:45pm 6/13/19</h4>
                    <p>adssssssssssssssssssssffffffffffffffffjkalldfjklads;</p>
                    <button>reply</button>
            </li>
            <li>
                    <h3>From: trollo</h3>
                    <h4>Sent: 2:29am 6/16/19</h4>
                    <p>do it faster do it stronger more than power makes us stronger power work is never over</p>
                    <button>reply</button>
            </li>
        </ul>
        </section>);
    }
}