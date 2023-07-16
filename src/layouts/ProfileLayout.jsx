import React,{useMemo} from 'react'
import Profile from "../Pages/Profile"
import {getCurrentUser} from "../API/FirestoreAPI"
import Topbar from "../Components/Common/Topbar/index"

export default function ProfileLayout() {
  const [currentUser,SetcurrentUser] = React.useState({})

  useMemo(()=>{
    getCurrentUser(SetcurrentUser)
  },[])
//  const Styles = {
//   backgroundColor : "#e1e1e1",
//   minHeight: "100vh"
//  }

  return (
    // style={Styles}
    <div >
        <Topbar currentUser={currentUser} />
        <Profile currentUser={currentUser}/>
    </div>
  )
}
