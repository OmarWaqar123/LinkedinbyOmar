import React from 'react'
import ProfileCard from './Common/ProfileCard'
import "../Sass/profilecomponent.scss"
import ProfileEdit from "../Components/Common/profileEdit/index"

export default function ProfileComponent({currentUser}) {
  
  const [isEdit, setisEdit] = React.useState(false)

  function onEdit() {
    setisEdit(prev => !prev)
  }
  
  return (
    
    <div>
        {isEdit ? <ProfileEdit currentUser={currentUser} onEdit={onEdit}/> : <ProfileCard currentUser={currentUser} onEdit={onEdit}/>}
    </div>
  )
}
