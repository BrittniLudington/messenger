
export default class TokenService
{
    static saveToken(token)
    {
        const string = token.name + ":" + token.password;
        window.localStorage.setItem("PRIVATE_MESSENGER",string);
    }

    static getToken()
    {
        return window.btoa(window.localStorage.getItem("PRIVATE_MESSENGER"));
    }

    static getCleanToken()
    {
        let full = window.localStorage.getItem("PRIVATE_MESSENGER");
        if(full === null)
        return null;      
        return full.split(':');
    }
}
