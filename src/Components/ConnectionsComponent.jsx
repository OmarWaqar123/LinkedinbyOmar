import React from 'react'
import { getAllUsers, addConnection, getConnections, TryGetAllConnections } from '../API/FirestoreAPI'
import "../Sass/ConnectionsComponent.scss"
import ConnectedUsers from "./Common/ConnectedUsers/index"

export default function ConnectionsComponent({currentUser}) {
  const [users, Setallusers] = React.useState([])
  const [isEmpty,SetisEmpty] = React.useState([])
  const [tryempty, Settryempty] = React.useState(false)
  const [tryallconnectionns,  trySetallconnections] = React.useState([])
  const [tryEmpty, SettryEmpty] = React.useState(false)
  const [tryEmpty2, SettryEmpty2] = React.useState(false) 

  function getCurrentUser(id) {
    // console.log(id)
    addConnection(currentUser.Userid, id)

  }


  React.useEffect(()=>{
    getAllUsers(Setallusers)
    TryGetAllConnections(trySetallconnections)
    if(users.length === 1 && users[0].id === currentUser.Userid) {
      SettryEmpty(true)

    }
    if(users.length - 1 === tryallconnectionns.length){
      SettryEmpty2(true)
    }
    
  },[])

  
  

 
  


  return (
    <div className='connections-main'>
      {tryEmpty || tryEmpty2 ? <p>No users available to connect</p> :
      users.map(user => {
        if(user.id !== currentUser.Userid) {
         return  <ConnectedUsers user={user} getCurrentUser={getCurrentUser} currentUser={currentUser}  /> 
        //  SetisEmpty={SetisEmpty}
        } else {
          return null
        }
         
      })
      
      
      }</div>
  )
}
