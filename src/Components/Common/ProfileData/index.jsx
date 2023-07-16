import React,{useMemo} from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../API/FirestoreAPI';
import "./index.scss"

export default function ProfileData({title, onLogout}) {
  const [currentUser, SetcurrentUser] = React.useState({})
    let navigate = useNavigate();
 
    useMemo(() => {
     getCurrentUser(SetcurrentUser)
    },[])
  //  console.log(currentUser)


  return (
     <div className='DAD'>
      <h4 className='Name'>{currentUser.name}</h4>
      <p className='headline'>{currentUser.headline}</p>
        <div 
           className='view-profile-dad'
           onClick={() => navigate("/profile")}>
           {title}       
        </div>

        <div 
           className='Logout'
           onClick={onLogout}
           >
           Logout       
        </div>

        {/* <p onClick={onLogout} className='logout'>Logout</p> */}
    </div>
  )
}
