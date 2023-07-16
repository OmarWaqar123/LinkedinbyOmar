import React,{useMemo} from 'react'
import Home from "../Pages/Home"
import {getCurrentUser} from "../API/FirestoreAPI"
import Topbar from "../Components/Common/Topbar/index"

export default function HomeLayout() {
  const [currentUser,SetcurrentUser] = React.useState({})

  useMemo(()=>{
    getCurrentUser(SetcurrentUser)
  },[])
  return (
    <div>
        <Topbar currentUser={currentUser} />
        <Home currentUser={currentUser}/>
    </div>
  )
}
