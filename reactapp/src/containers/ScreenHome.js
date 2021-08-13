import React, {useState} from 'react';
import '../App.css';
import {Input,Button} from 'antd';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

function ScreenHome(props) {
  const [usernameSU, setUsernameSU] = useState('')
  const [emailSU, setEmailSU] = useState('')
  const [passwordSU, setPasswordSU] = useState('')
  const [emailSI, setEmailSI] = useState('')
  const [passwordSI, setPasswordSI] = useState('')
  const [redirectSignup, setRedirectSignup] = useState(false)
  const [redirectSignin, setRedirectSignin] = useState(false)
  const [messageErreurSignUp, setMessageErreurSignUp] = useState('')
  const [messageErreurSignIn, setMessageErreurSignIn] = useState('')

  const handleSignUp = async (username,email,password) => {
    const rawResponse = await fetch('/sign-up',{
      method : 'POST',
      headers : {'Content-Type': 'application/x-www-form-urlencoded'},
      body : `username=${username}&email=${email}&password=${password}`
    })
    const response = await rawResponse.json()
    if (!response.result){
      console.log('RESPONSE', response)
      props.setToken(response.user.token)
      setRedirectSignup(true)
      return
    }
    setMessageErreurSignUp('Username or email already exists')
  }
  const handleSignIn = async (email,password) => {
    console.log(email,password)
    const rawResponse = await fetch('/sign-in',{
      method : 'POST',
      headers : {'Content-Type': 'application/x-www-form-urlencoded'},
      body : `email=${email}&password=${password}`
    })
    const response = await rawResponse.json()
    if (response.login){
      props.setToken(response.user.token)
      setRedirectSignin(true)
      return
    }
    setMessageErreurSignIn('Wrong email or password')
  }
  if(redirectSignup || redirectSignin){
    return <Redirect to = "/screensource" />
  }
  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
                  
                  <Input className="Login-input" placeholder="email" onChange={(e) => setEmailSI(e.target.value)} value= {emailSI}/>

                  <Input.Password className="Login-input" type="password" placeholder="password" onChange={(e) => setPasswordSI(e.target.value)} value = {passwordSI} />

                  <h6>{messageErreurSignIn}</h6>
            

            <Button style={{width:'80px'}} type="primary" onClick = {()=> handleSignIn(emailSI,passwordSI)}>Sign-in</Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
                  
                  <Input className="Login-input" placeholder="username" onChange={(e) => setUsernameSU(e.target.value)} value= {usernameSU} />

                  <Input className="Login-input" placeholder="email" onChange={(e) => setEmailSU(e.target.value)} value= {emailSU} />

                  <Input.Password className="Login-input" type="password" placeholder="password" onChange={(e) => setPasswordSU(e.target.value)} value = {passwordSU} />

                  <h6>{messageErreurSignUp}</h6>

              <Button style={{width:'80px'}} type="primary" onClick = {()=> handleSignUp(usernameSU,emailSU,passwordSU)}>Sign-up</Button>

          </div>

      </div>
  );
}

const mapDispatchToProps = function(dispatch){
  console.log("dispatch signup",dispatch)
  return {
    setToken : function(token){
      console.log("click", token)
      dispatch({type : 'setToken', token})
    }
  }
}

export default connect(null, mapDispatchToProps)(ScreenHome);
