import React,{useMemo} from 'react'
import {TryGetAllConnections} from "../../../API/FirestoreAPI"
import {AiOutlineUsergroupAdd} from "react-icons/ai"

export default function ConnectedUsers({user,getCurrentUser, currentUser}) {
  // ,SetisEmpty
  
  const [Connected, Setconnected] = React.useState(false)
  const [Allconnections, setAllconnections] = React.useState([])

   React.useEffect(() => {
    TryGetAllConnections(setAllconnections)
   },[])
   console.log(Allconnections)
   
   useMemo(()=>{
    
    Setconnected(
      Allconnections.some(item => item.targetId === user.id && item.userId === currentUser.Userid) 
      )
     console.log(Connected)

  //  SetisEmpty(prev => [...prev,Connected])

   },[Allconnections])

  return Connected ? <></> : (
    //className ={Connected ? "blue-grid-child" : "grid-child"}
    <div className = "grid-child" >
      <img className='connection-prof-img' src={user.imageLink} />
        <p className='name'>{user.name}</p>
        <p className='headline'>{user.headline}</p>

        <button className='connect-btn'onClick={() => getCurrentUser(user.id)}>
          <AiOutlineUsergroupAdd size={20} />
          Connect
          </button>
    </div>
  ) 
}
