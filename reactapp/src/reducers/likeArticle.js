export default function(wishList = [], action){
    if(action.type === "addArticle"){
        const newWishList = wishList.filter((e)=>(e.title !== action.title))
        return ([...newWishList, {title : action.title, description : action.description, content : action.content, image : action.image}])
    }
    if(action.type === "removeArticle"){
        console.log("article supprimé")
        return (wishList.filter((e)=>(e.title !== action.title)))
    }
    return wishList
}