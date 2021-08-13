import React,{useState, useEffect} from 'react';
import '../App.css';
import { List, Avatar} from 'antd';
import Nav from '../Nav'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])

  useEffect(()=>{
    console.log("ScreenSource is loaded hahahahahha")
    console.log("props", props)
    async function loadData() {
      console.log("fonction lancée")
      props.languageAtFirst(props.token)
      var rawResponse = await fetch(`https://newsapi.org/v2/sources?/${props.countryAPI}&apiKey=8779b06fef76451fb6499e5005138d69`)
      var response = await rawResponse.json()
      console.log ("response", response)
      setSourceList(response.sources)
    } 
    loadData()
    },[])

    useEffect(()=>{
      console.log("ScreenSource is updated")
      console.log("props", props)
      async function loadData() {
        var rawResponse = await fetch(`https://newsapi.org/v2/sources?/${props.countryAPI}&apiKey=8779b06fef76451fb6499e5005138d69`)
        var response = await rawResponse.json()
        setSourceList(response.sources)
      } 
      loadData()
      },[props])

    console.log(props.token)

    if(props.token === ''){
      return <Redirect to = '/' />
    }
    


  return (
    <div>
        <Nav/>
       
       <div className="Banner">

          <div className='divDrapeaux'>
            <Avatar src = "/images/ru.png"  className = 'UK' onClick = {()=> props.changeLanguageEnglish(props.token)}/>
            <Avatar src = "/images/logo192.png" className='FR' onClick = {()=> props.changeLanguageFrench(props.token)}/>
          </div>  

        </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${item.category}.png`} />}
                        title={<Link to ={`/screenarticlesbysource/${item.id}`}>{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

const mapDispatchToProps = function(dispatch){
  console.log("dispatch",dispatch)
  return {
    changeLanguageEnglish : async function(token){
      const language = 'eng&country=gb'
      const languageBackend= await fetch('/language',{
        method : 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
        body : `language=${language}&token=${token}`
      })
      const responseLanguage = await languageBackend.json()

      dispatch({type : "changeEnglish", language: responseLanguage.language})
    }, 
    changeLanguageFrench : async function(token){
      const language = 'fr&country=fr'
      const languageBackend= await fetch('/language',{
        method : 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
        body : `language=${language}&token=${token}`
      })
      const responseLanguage = await languageBackend.json()

      dispatch({type : "changeFrench", language: responseLanguage.language})
      }, 
      languageAtFirst : async function (token){
        console.log("language first", token)
        const languageBackendFirst = await fetch('/language-first', {
          method : 'POST',
          headers : {'Content-Type': 'application/x-www-form-urlencoded'},
          body : `token=${token}`
        })
        const responseLanguage = await languageBackendFirst.json()

        dispatch({type : "languageFirst", language: responseLanguage.language})

      }
    }
  }

function mapStateToProps(state){
  console.log("STATE",state)
  return {articleWishList : state.articleWishList, token : state.token, countryAPI : state.countryAPI}; // Nom du state dans le store 
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
