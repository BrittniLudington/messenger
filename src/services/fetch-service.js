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
        }).then(res => 
            {
                console.log(res);
                if(res.status === 401)
                    return false;
                return true;
        
            });
    }
    static registerUser(name,password)
    {
        fetch(`http://localhost:8000/users`,
        {   
            crossDomain: true,
            method: 'POST',
            headers: {
                'Authorization':`basic ${TokenService.getToken()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:{
                name:name,
                password:password
            }

        })
        .then(res => console.log(res));
    }
}