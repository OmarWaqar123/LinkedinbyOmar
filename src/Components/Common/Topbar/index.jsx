import React, { useEffect } from 'react'
import "./index.scss"
import linkedinLogo from "../../../assets/linkedin-logo.png"
import {AiOutlineHome,AiOutlineUserSwitch,AiOutlineSearch,AiOutlineMessage,AiOutlineBell} from "react-icons/ai"
import {BsBriefcase} from "react-icons/bs"

import UserIcon from "../../../assets/User-Icon.png"
import { useNavigate } from 'react-router-dom'
import{onLogout} from "../../../API/AuthAPI"
import ProfileData from '../ProfileData/index'
import { Popover, Space } from 'antd';
import SearchUsers from "../SearchUsers/index"
import { getAllUsers } from '../../../API/FirestoreAPI'

export default function Topbar({currentUser}) {
  
  const [isSearch, SetisSearch] = React.useState(false)
  const [SearchInput, SetsearchInput] = React.useState("")
  const [Users, Setusers] = React.useState([])
  const [filteredUsers, SetfilteredUsers] = React.useState([])

  React.useEffect(() => {
    getAllUsers(Setusers)
    
  },[])

  // console.log(filteredUsers)

  function openUser(user) {
    navigate("/profile", {state : {
      id:user.id, email:user.email
    }})
  }

  const handleSearch = () => {
    if(SearchInput !== "") {
      let searched = Users.filter(user => {
        return Object.values(user)
        .join("").toLowerCase()
        .includes(SearchInput.toLowerCase().trim())
      })

      SetfilteredUsers(searched)

    }else{
      SetfilteredUsers(Users)

    }
  }


  useEffect(()=>{
    let debounced = setTimeout(() => {
       handleSearch()
    },1000)

    return () => clearTimeout(debounced)

  },[SearchInput])
  
  const content = (
    <div className='profile-des'>
      <ProfileData title={"View Profile"} onLogout={onLogout} />
      
    </div>
  )

  let navigate = useNavigate()
  return (
    <div className={isSearch ? "topbar-with-search" : 'topbar'}>

        
        <img src={linkedinLogo} className='logo'></img>

        {isSearch ? <SearchUsers SetisSearch=              {SetisSearch}
        SetsearchInput={SetsearchInput}
        /> : <>
        <div className='search-icon-dad' >
        <AiOutlineSearch
         onClick={() => SetisSearch(true)}
         size={50}
         className='search-icon'
         />
         </div>
        <div className='react-icons'>

        <AiOutlineHome size={40} className='icons home' onClick={() => navigate("/home")}/>
        <AiOutlineUserSwitch size={40} className='icons user'
        onClick={() => navigate("/connections")}
        />
        <BsBriefcase size={40} className='icons briefcase'/>
        <AiOutlineMessage size={40} className='icons msg'/>
        <AiOutlineBell size={40} className='icons bell'/>   
        </div> </> }

        <div>
        <Popover placement='bottomRight'  content={content}  trigger="click">
        <img src={currentUser.imageLink} className="user-icon"></img>
        </Popover>
        </div>
         

         {SearchInput ? 
         <div className='search-result'>
          
          {filteredUsers.map(user => (
            <div 
            className='search-inner' 
            onClick={()=>openUser(user)}>

              <img src={user.imageLink} />
              <p>{user.name}</p>

            </div>
          ))}
          </div> : null}
        
    </div>
  )
}
