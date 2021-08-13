export default function(countryAPI = 'language=fr&country=fr', action){
    console.log('action', action)
    if(action.type === "changeEnglish"){
        return action.language
    }
    if(action.type === "changeFrench"){
        return action.language
    }
    if (action.type =="languageFirst"){
        return action.language
    }
    return countryAPI
}
