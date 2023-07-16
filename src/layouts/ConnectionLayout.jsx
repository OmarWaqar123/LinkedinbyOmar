import React,{useMemo} from 'react'
import Connections from "../Pages/Connections"
import {getCurrentUser} from "../API/FirestoreAPI"
import Topbar from "../Components/Common/Topbar/index"

export default function ConnectionsLayout() {
  const [currentUser,SetcurrentUser] = React.useState({})

  useMemo(()=>{
    getCurrentUser(SetcurrentUser)
  },[])
  return (
    <div>
        <Topbar currentUser={currentUser} />
        <Connections currentUser={currentUser}/>
    </div>
  )
}
