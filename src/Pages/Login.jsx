import React from 'react'
import LoginComponent from '../Components/LoginComponent'
import "../Sass/loginPage.scss"
import linkedinLogo from "../assets/linkedin-logo.png"
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "../FirebaseConfig"
import { useNavigate } from 'react-router-dom'
import Loader from "../Components/Common/Loader"

export default function Login() {

  const [loading, Setloading] = React.useState(true)

  let navigate = useNavigate();
  React.useEffect(() => {
    onAuthStateChanged(auth, res => {
      if (res && res.accessToken) {
        navigate("/home")
    }else {
      Setloading(false)
    }
    })

},[])
  return  loading ? <Loader /> : (
    <div className='loginPage'>
    <img src={linkedinLogo} className='linkedin-logo'/>
    <LoginComponent />
    </div>
  )
}
