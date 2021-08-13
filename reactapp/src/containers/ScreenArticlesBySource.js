import React, {useState, useEffect} from 'react';
import '../App.css';
import { Card, Icon} from 'antd';
import Nav from '../Nav'
import {useParams} from 'react-router-dom'
import {Redirect} from 'react-router-dom'


import {connect} from 'react-redux'

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  const [articleList, setArticleList] = useState([])
  const {id} = useParams()

  console.log("ARTCLE LIST",articleList)

  useEffect(()=>{
    async function loadData() {
      const url = `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=8779b06fef76451fb6499e5005138d69`
      console.log("URL",url)
      const rawResponse = await fetch(url)
      const response = await rawResponse.json()
      setArticleList(response.articles)
    } loadData()
  },[])

  if(props.token === ''){
    return <Redirect to = '/' />
  }
  
 
  return (
    <div>
         
            <Nav/>

            <div className="Banner">

            </div>


            <div className="Card">
    
              <div  style={{display:'flex',justifyContent:'center', flexWrap:'wrap'}}>

                {articleList.map((article, i)=>(
                  <Card
                  key = {i}
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="hmmm"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2"/>,
                      <Icon type="like" key="ellipsis" onClick = {() => props.addToWishList(article.title,article.description, article.content, article.urlToImage)}/>
                  ]}
                  >
                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>
                ))}
              </div>
           </div>     
      </div>
  );
}

const mapDispatchToProps = function(dispatch){
  console.log("dispatch",dispatch)
  return {
    addToWishList : async function(title, description, content, image){
      const envoiBackend = await fetch('/add-article',{
        method : 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
        body : `title=${title}&description=${description}&image=${image}&content=${content}`
      })
      const reponseBackend = await envoiBackend.json()
      const idBackendArticle = reponseBackend.articleSaved._id
      console.log("click", title, description, content, idBackendArticle)
      dispatch({type : 'addArticle', title : title, description : description, content : content, image : image, idArticle : idBackendArticle})
    }
  }
}

function mapStateToProps(state){
  console.log("STATE",state)
  return { token : state.token}; // Nom du state dans le store 
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenArticlesBySource);
