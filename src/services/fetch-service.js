import TokenService from './token-service';

export default class Server
{
    static getRelatedMessages()
    {
        /*fetch(`localhost:8000/messages`,
        {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Authorization':`basic ${TokenService.getToken()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((result)=>result.json())
        .then((res)=>console.log(res));
        */
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