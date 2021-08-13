export default function(countryAPI = 'language=fr&country=fr', action){
    if(action.type === "changeEnglish"){
        return 'language=eng&country=gb'
    }
    if(action.type === "changeFrench"){
        return 'language=fr&country=fr'
    }
    return countryAPI
}
