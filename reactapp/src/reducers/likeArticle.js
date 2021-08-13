export default function(wishList = [], action){
    if(action.type === "addArticle"){
        const newWishList = action.userWishList.filter((e)=>(e.title !== action.title))
        return ([...newWishList, {title : action.title, description : action.description, content : action.content, image : action.image, idArticle : action.idArticle}])
    }
    if(action.type === "removeArticle"){
        console.log("article supprimé")
        return (wishList.filter((e)=>(e.title !== action.title)))
    }
    if(action.type === "startUserWishList"){
        console.log("entrée nouveau wishlist")
        return action.wishList
    }
    return wishList
}