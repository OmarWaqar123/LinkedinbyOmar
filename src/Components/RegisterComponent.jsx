import React from 'react'
import {RegisterAPI, GoogleSigninAPI} from "../API/AuthAPI"
import "../Sass/LoginComponent.scss"
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import getUniqueID from "../Helpers/getUniqueID"

import {postUserData} from "../API/FirestoreAPI"


export default function RegisterComponent() {
  const [Credentials, Setcredentials]= React.useState({})
  let navigate = useNavigate()

  const Register= async () => {
    try{
    const res = await RegisterAPI(Credentials.email,Credentials.password)
    postUserData({
      name : Credentials.Name,
      email: Credentials.email,
      userID : getUniqueID(),
      imageLink: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
      })
    toast.success("Account Created!")
    localStorage.setItem("userEmail",res.user.email)
    navigate("/home")
    }catch (e) {
      toast.error("Can not create your account")
      
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
       <h3 className='login-comp-head'>Make the most of your professional life</h3>

      <div className="auth-inputs"> 
         <input 
         className='common-input' 
         placeholder='Enter your Name'
         type='text'
         onChange={e => Setcredentials(prevCred => {
          return {...prevCred, Name: e.target.value
          }
         })
         }
         />

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
        placeholder='Password (6 or more characters)'
        type='password'
         onChange={e => Setcredentials(prevCred => {
          return {...prevCred, password: e.target.value
          }
         })
         }
         />

      </div>



    <button onClick={Register} className='login-btn'>Join</button>
    <hr className="hr-text" data-content="OR"/>    
    
    <GoogleButton
     onClick={GoogleProviderSignIn}
     className='google-Signin-btn'
    />

    <p className='joinNow'>Already on LinkedIn?<span onClick={() => navigate("/")}> Log In</span></p>

    </div>
    
  )
}
