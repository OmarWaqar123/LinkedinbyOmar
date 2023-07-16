import React,{useMemo} from 'react'
import {
  GetStatus,
  getSingleStatus,
  getSingleUser,
   } from '../../../API/FirestoreAPI';
import PostsCard from '../PostsCard';
import { useLocation } from 'react-router-dom';
import { HiOutlinePencil } from 'react-icons/hi';
import { getDomain } from 'tldjs';
import {uploadImageAPI} from "../../../API/ImageUpload.jsx"
import FileUploadModal from '../FileUploadModal';


import "./index.scss"

export default function ProfileCard({currentUser,onEdit}) {
  let location = useLocation()
  const [AllStatus, setAllStatus] = React.useState([])
  const [CompleteStatus, setcompleteStatus] = React.useState([])
  const [currentProfile, setCurrentProfile] = React.useState({})
  const [url, setUrl] = React.useState('');
  const [domainName, setDomainName] = React.useState('');
  const [currentImage, SetcurrentImage] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [progress, Setprogress] = React.useState(0)
  
    
  

  React.useEffect(()=>{
    if(Object.values(currentProfile).length === 0 ) {
      setUrl(currentUser.website)
    } else {
      setUrl(currentProfile.website)
    }
     
  },[currentUser,currentProfile])

  React.useEffect(() => {
    if(url) {
      setDomainName(getDomain(url))
    }

  },[url])
  
  
  useMemo(()=>{
    if(location.state && location.state.id) {
      getSingleStatus(setAllStatus,location.state.id)
    }

    if(location.state && location.state.email){
      getSingleUser(setCurrentProfile, location.state.email)
    }
    
    // domainName = GetMainUrlName()

    if(!location.state ){
      GetStatus(setcompleteStatus)
      
    }
    // GetStatus(setAllStatus)
   },[])

  
   function handlefile(e) {
      SetcurrentImage(e.target.files[0])

   }

   function UploadImage() {
    if(currentImage.name) {

      uploadImageAPI(currentImage,currentUser.Userid,      setModalOpen, Setprogress, SetcurrentImage)


    }   

   }
   


  return (
    <>
    <FileUploadModal modalOpen={modalOpen} setModalOpen={setModalOpen} handlefile={handlefile} UploadImage={UploadImage} currentImage={currentImage} progress={progress} />
    <div className='profile-card'>
      
      { !location.state ? 
      <div className='edit-btn'>
        <HiOutlinePencil 
        onClick={onEdit} 
        size={23}
        className='edit-pencil' 
        />
      </div> : null }
      <div className='profile-Info'>
        <div>
          <img 
           className='profile-img'
           onClick={() => setModalOpen(true)}
           src={Object.values(currentProfile).length === 0 ? currentUser.imageLink : currentProfile.imageLink} alt='No image'/>
           <h3 className='username'>{
           Object.values(currentProfile).length === 0 ? currentUser.name : currentProfile.name}</h3>

           <p className='heading'>{ Object.values(currentProfile).length === 0 ? currentUser.headline : currentProfile.headline}
           </p>

           <p className='location'>{Object.values(currentProfile).length === 0 ? currentUser.country: currentProfile.country} ,  
           {
            Object.values(currentProfile).length === 0 ? currentUser.city: currentProfile.city

           }
           </p>

           <a 
           className='website' 
           target='none'
           href={Object.values(currentProfile).length === 0 ? currentUser.website : currentProfile.website}>{domainName}
           </a>

      </div>


      <div className='right-info'>
      <p className='college'>{Object.values(currentProfile).length === 0 ? currentUser.college : currentProfile.college}
      </p>

      <p className='company'>{Object.values(currentProfile).length === 0 ? currentUser.company : currentProfile.company}
      </p>

      </div>     
      </div>
         
      <p className='about_me'>{ Object.values(currentProfile).length === 0 ? currentUser.aboutMe : currentProfile.aboutMe}
      </p>

      <p className='skills'>
        <span className='skills-label'>Skills:&nbsp;</span> { Object.values(currentProfile).length === 0 ? currentUser.skills : currentProfile.skills}
      </p>

      </div>
      
      {/* AllStatus.filter(item => {
              return item.userEmail === localStorage.getItem("userEmail"),map((post,id)) */}

      {AllStatus.length > 0 ?  (<div className='posts-dad'>
            {AllStatus
            .map((post,id) => {
              return (
                <div className='post'>
                <PostsCard posts = {post} key={id} id={id}/>
                </div>
              ) 
            })}
      </div> ) : (
          
         <div className='posts-dad'>
            {CompleteStatus.filter(item => {
              return item.userEmail === localStorage.getItem("userEmail")
            })
            .map((post,id) => {
              return (
                <div className='post'>
                <PostsCard posts = {post} key={id} id={id}/>
                </div>
              ) 
            })}
      </div> 

      ) }

      </>
  )
}
