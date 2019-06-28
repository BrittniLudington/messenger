
export default class TokenService
{
    static saveToken(token)
    {
        const string = token.name + ":" + token.password;
        window.localStorage.setItem("PRIVATE_MESSENGER",string);
    }

    static getToken()
    {
        console.log(window.btoa(window.localStorage.getItem("PRIVATE_MESSENGER")));
        return window.btoa(window.localStorage.getItem("PRIVATE_MESSENGER"));
    }
}
