import React, { useMemo } from 'react'
import "./index.scss"
import {EditProfile,GetStatus} from "../../../API/FirestoreAPI"
import {AiOutlineClose} from "react-icons/ai" 

export default function ProfileEdit({currentUser,onEdit}) {
  const [editInputs,SeteditInputs] = React.useState(currentUser)

  React.useEffect(()=>{
    document.body.classList.add("profileEdit-body");

    return () =>{
      document.body.classList.remove("profileEdit-body")
    }
  },[])

  React.useEffect(()=>{
    GetStatus(SeteditInputs)
  },[])
  function getInput(e) {
     let {name, value} = e.target;
     let input  = {[name] : value}
     SeteditInputs(prev => {
      return {...prev, ...input}
     })
     
  }

  
  
  async function updateProfileData() {
    await EditProfile(currentUser.Userid, editInputs)
    await onEdit()

  }
  

  return (
    <div className='profile-card try'>
      <div className='edit-btn'>
        
        <AiOutlineClose 
        onClick={onEdit}
        size={30}
        className='cancel-button'
        />

      </div>

      <div className='profile-inputs'>
        <label className='name-label'>Name</label>
      <input 
      onChange={getInput} 
      className = "common-input"
      placeholder='Name'
      name='name'
      value={editInputs.name} 
       />
      

      <label className='headline-label'>Headline</label>
      <input 
      onChange={getInput}
      className = "common-input" 
      placeholder='Headline'
      name='headline'
      value={editInputs.headline}
      />

      
      <label className='Country-label'>Country</label>
      <input 
      onChange={getInput}
      className = "common-input"
      placeholder='Country'
      name='country'
      value={editInputs.country}
      />

      <label className='location-label'>City</label>
      <input 
      onChange={getInput}
      className = "common-input"
      placeholder='City'
      name='city'
      value={editInputs.city}
      />
      

      
      <label className='company-label'>Company</label>
      <input 
      onChange={getInput}
      className = "common-input" 
      placeholder='Company'
      name='company'
      value={editInputs.company}
      />

      <label className='industry-label'>Industry</label>
      <input 
      onChange={getInput}
      className = "common-input"
      placeholder='Industry'
      name='industry'
      value={editInputs.industry}
      />


      
      <label className='college-label'>College</label>
      <input 
      onChange={getInput}
      className = "common-input"
      placeholder='College'
      name='college'
      value={editInputs.college}
      />

     <label className='Website-label'>Website</label>
      <input 
      onChange={getInput}
      className = "common-input"
      placeholder='Website'
      name='website'
      value={editInputs.website}
      />

<label className='About-label'>About</label>
      <textarea 
      onChange={getInput}
      className = "common-input"
      placeholder='About Me'
      name='aboutMe'
      value={editInputs.aboutMe}
      />

     <label className='skills-label'>Skills</label>
      <input 
      onChange={getInput}
      className = "common-input"
      placeholder='Skills'
      name='skills'
      value={editInputs.skills}
      />


      <button className='Save-btn' onClick={updateProfileData}>Save</button>
       </div>
    </div>
      )
}
