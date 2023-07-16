import React,{useEffect} from 'react'
import ConnectionsComponent from '../Components/ConnectionsComponent'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "../FirebaseConfig"
import { useNavigate } from 'react-router-dom'
import Loader from "../Components/Common/Loader"


export default function Connections({currentUser}) {

 const [loading, Setloading] = React.useState(true)

   let navigate = useNavigate();

   React.useEffect(() => {
     onAuthStateChanged(auth, res => {
       if (!res || !res.accessToken) {
         navigate("/")
     } else {
       Setloading(false)
     }
     })
 
 },[])
  return loading ? <Loader/> : (
    <div>
       <ConnectionsComponent currentUser={currentUser}/>
    </div>
  )
}
