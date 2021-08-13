export default function(token = '', action){
    if(action.type === "setToken"){
        return action.token
    }
    return token
}
