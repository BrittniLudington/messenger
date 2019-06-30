import TokenService from './token-service';

export default class Server
{
    static getRelatedMessages(id)
    {
        return fetch(`http://localhost:8000/messages/${id}`,
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
        return fetch(`http://localhost:8000/users/${id}`,
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
        return fetch(`http://localhost:8000/search/${query}`,
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
        return fetch(`http://localhost:8000/sending`,
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
                header:header,
                subject:subject
            })
        })
    }
    

    static getUser()
    {
        return fetch(`http://localhost:8000/users/MyAccount`,
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
        fetch(`http://localhost:8000/users`,
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