import React, {useState, useEffect} from 'react';
import '../App.css';
import { Card, Icon} from 'antd';
import Nav from '../Nav'
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

const { Meta } = Card;

function ScreenMyArticles(props) {

  console.log("PROOOOOOOOPS", props)

  console.log("props.articleWishList", props.articleWishList)

  const [isEmpty,setIsEmpty] = useState(true)

  console.log("isEmpty", isEmpty)

  useEffect(()=>{
    async function initialisationArticleWishlist(token){
      const reponseStart = await fetch('/begin-user-wish-list',{
        method : 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
        body : `token=${token}`
      })
      const wishListReponse = await reponseStart.json()
      if (wishListReponse.resultat === "token existe"){
          console.log("reponse start", wishListReponse)
          props.sendUserWishListToReducer(wishListReponse.userWishList)
          // setIsEmpty(false)
      }
    } 
    initialisationArticleWishlist(props.token)
    // function articleListEmpty(){
    //   if (props.articleWishList.length){
    //     setIsEmpty(false)
    //   }
    // }
    // articleListEmpty()
    
  }, 
  [])

  if(!props.articleWishList.length){
    return (
      <div>
        <Nav/>
        <div className="Banner">

        </div>
        <h1>No articles in wishlist</h1>
      </div>)
  }

  console.log(props.token)
  if(props.token === ''){
    return <Redirect to = '/' />
  }
  

  return (
    <div>
         
      <Nav/>
        <div className="Banner">

        </div>
        <div className="Card">
          {props.articleWishList.map((article) =>{
            return (
              <div  style={{display:'flex',justifyContent:'center'}}>
              <Card
                style={{  
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                cover={
                <img
                    alt="example"
                    src={article.image}
                />                        
                }            
                actions={[
                  <Icon type="read" key="ellipsis2" />,
                    <Icon type="delete" key="ellipsis" onClick = {() => props.removeFromWishList(article.title, article._id)} />
                ]}
                >                       
                <Meta
                  title={article.title}
                  description={article.description}
                />                
              </Card>
            </div>
            )
          })}
        </div>
      </div>
  );
}

const mapDispatchToProps = function(dispatch){
  console.log("dispatch",dispatch)
  return {
    addToWishList : function(title, description, content, image){
      console.log("click", title, description, content)
      dispatch({type : 'addArticle', title : title, description : description, content : content, image : image})
    }, 
    removeFromWishList : async function(title, idArticle){
      console.log('REMOVE ENVOYÉ')
      const envoiBackend = await fetch('/delete-article',{
        method : 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
        body : `id=${idArticle}`
      })
      console.log("click remove", title)
      dispatch({type : "removeArticle", title: title})
    },
    sendUserWishListToReducer : function(wishList){
      dispatch({type : 'startUserWishList', wishList : wishList})
    }
    }
  }

function mapStateToProps(state){
  console.log("STATE",state)
  return {articleWishList : state.articleWishList, token : state.token}; // Nom du state dans le store 
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
