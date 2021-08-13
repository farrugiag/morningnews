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
    console.log("ScreenSource is loaded")
    console.log("props", props)
    async function loadData() {
      var rawResponse = await fetch(props.urlSource)
      var response = await rawResponse.json()
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
            <Avatar src = "/images/ru.png"  className = 'UK' onClick = {()=> props.changeLanguageEnglish()}/>
            <Avatar src = "/images/logo192.png" className='FR' onClick = {()=> props.changeLanguageFrench()}/>
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
    changeLanguageEnglish : function(){
      dispatch({type : "changeEnglish"})
    }, 
    changeLanguageFrench : function(){
      dispatch({type : "changeFrench"})
      }
    }
  }

function mapStateToProps(state){
  console.log("STATE",state)
  return {articleWishList : state.articleWishList, token : state.token, countryAPI : state.countryAPI}; // Nom du state dans le store 
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
