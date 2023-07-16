import React from 'react'
import {LoginAPI, GoogleSigninAPI} from "../API/AuthAPI"
import "../Sass/LoginComponent.scss"
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function LoginComponent() {
  const [Credentials, Setcredentials]= React.useState({})
  let navigate = useNavigate()

  const login= async () => {
    try{
    const res = await LoginAPI(Credentials.email,Credentials.password)
    toast.success("Successfully Signed In!")
    localStorage.setItem("userEmail",res.user.email)
    navigate("/home")
    }catch (e) {
      toast.error("Please Check your Credentials")
      
    }

  }

  const GoogleProviderSignIn = async() => {
    try{
     await GoogleSigninAPI()
    toast.success("Successfully Signed In")
    navigate("/home")

    } catch(e) {
      console.log(e)
      toast.error("Signed In Failed")

    }
  }


  return (
    <div className='login-wrapper'>
       <h1 className='login-comp-head'>Sign in</h1>
       <p className='sub-head'>Stay updated on your professional world</p>
      <div className="auth-inputs">   
         <input 
         className='common-input' 
         placeholder='Enter your Email'
         type='email'
         onChange={e => Setcredentials(prevCred => {
          return {...prevCred, email: e.target.value
          }
         })
         }
         />

        <input 
        className='common-input'
        placeholder='Password'
        type='password'
         onChange={e => Setcredentials(prevCred => {
          return {...prevCred, password: e.target.value
          }
         })
         }
         />

      </div>



    <button onClick={login} className='login-btn'>Sign in</button>
    <hr className="hr-text" data-content="OR"/>    
    
    <GoogleButton
     onClick={GoogleProviderSignIn}
     className='google-Signin-btn'
    />

    <p className='joinNow'>New to LinkedIn?<span onClick={() => navigate("/register")}> Join Now</span></p>

    </div>
    
  )
}
