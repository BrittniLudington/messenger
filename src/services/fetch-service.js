import TokenService from './token-service';

let url = "https://messenger-app-server.herokuapp.com/";
export default class Server
{
    static getRelatedMessages(id)
    {
        return fetch(`${url}messages/${id}`,
        {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(res => {return res});//=>{return result.json()});
        
    }

    static getAUser(id)
    {
        return fetch(`${url}users/${id}`,
        {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(res => {return res});
    }

    static getUsersByQuery(query)
    {
        return fetch(`${url}search/${query}`,
        {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(res => {return res});
    }

    static getAllUsers()
    {
        return fetch(`${url}users/`,
        {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(res => {return res});
    }

    static sendMessage(to,header,subject)
    {
        return fetch(`${url}sending`,
        {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Authorization':`basic ${TokenService.getToken()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                to:to,
                header:window.btoa(header),
                subject:window.btoa(subject)
            })
        })
    }
    

    static getUser()
    {
        return fetch(`${url}users/MyAccount`,
        {
            crossDomain:true,
            method: 'GET',
            headers:
            {
                'Authorization':`basic ${TokenService.getToken()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res =>
            {

                if(res.status === 401)
                    return false;
                return res.json();
        
            });
    }

    static registerUser()
    {
        let full = window.localStorage.getItem("PRIVATE_MESSENGER").split(':');
        let name = full[0],password = full[1];
        name = window.btoa(name);
        password = window.btoa(password);
        fetch(`${url}users`,
        {   
            crossDomain: true,
            method: 'POST',
            headers: {
                'Authorization':`basic ${TokenService.getToken()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:name,
                password:password
            })
            
        })
        .then();
    }
}