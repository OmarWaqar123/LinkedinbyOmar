import React,{useMemo} from 'react'
import "./index.scss"
import { useNavigate } from 'react-router-dom'
import {getCurrentUser, getAllUsers, deletePost, getConnections} from "../../../API/FirestoreAPI"
import LikeButton from '../LikeButton';
import {BsPencil, BsTrash} from "react-icons/bs"
import { Button, Modal } from 'antd';


export default function PostsCard({posts,id,getEditData}) {
  const [currentUser, SetCurrentuser] = React.useState({})
  const [AllUsers,setAllUsers] = React.useState([])
  const [realperson, SetrealPerson] = React.useState({})
  const [imageModal, SetimageModal] = React.useState(false)
  const [isConnected, Setisconnected] = React.useState(false)
  const [newIconSize,setIconSize ] = React.useState()

  let navigate = useNavigate();


  // useEffect(() => {
  //   const handleResize = () => {

  //     const newIconSize = window.innerWidth >= 800 ? 30 : 20; 
  
  //     setIconSize(newIconSize);
  //   };
  
    
  //   window.addEventListener('resize', handleResize);
  
    
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []); 




  useMemo(()=>{
    getCurrentUser(SetCurrentuser)
    getAllUsers(setAllUsers)
  },[])

   

  // useMemo(() => {
    React.useEffect(() => {
    let Person = AllUsers.find(item => item.id === posts.userID)
    SetrealPerson(Person)
    // console.log(realperson)
   
  },[AllUsers, realperson])


  React.useEffect(()=>{
    getConnections(currentUser.Userid,posts.userID,Setisconnected)
  },[currentUser.Userid,posts.userID])



  return isConnected || currentUser.Userid === posts.userID ? (

    <div className='post-card' key={id}>

      <div className='post-image-wrapper'>

      <img 
      className='post-image'
      src={AllUsers.filter(item => item.id === posts.userID).map(item => item.imageLink)[0]} alt='profile-img' />

        <div className='username-headline-date'>
        <p className='userName' 
        onClick={() => navigate("/profile", {state : {
          id:posts.userID, email:posts.userEmail
        }})}
        >
          {/* {realperson  ? realperson.name : ""} */}
          {AllUsers.filter(item => item.id === posts.userID).map(item => item.name)[0]}
        
        
        </p>
        
        <p className='headline'>{
        // realperson?.headline
        AllUsers.filter(item => item.id === posts.userID).map(item => item.headline)[0]
        }</p>
        <p className='timeStamp'>{posts.time}</p>

        </div>
        
        {posts.userID === currentUser.Userid ? 
        <div className="action-container">
            <BsPencil size={15}/*20*/ className='action-icon' onClick={() => getEditData(posts)}/>
            <BsTrash size={15}/*20*/ className='action-icon' onClick={() => deletePost(posts.id)}/>
        </div> : null
         } 

        </div>
        <div className='status' dangerouslySetInnerHTML={{__html:posts.status}}></div>

        {posts.postImage ? 
        <img 
        src={posts.postImage}
        alt='Post-image'
        onClick={()=>SetimageModal(true)}
        className='post-image-real' 
         /> : null }

        <LikeButton userId={currentUser.Userid} postId={posts.id} name = {currentUser.name}/>

        <Modal
        centered
        open={imageModal}
        onOk={() => SetimageModal(false)}
        onCancel={() => SetimageModal(false)}
        footer={[]}
         >
        {posts.postImage ? 
        <img 
        src={posts.postImage}
        alt='Post-image'
        onClick={()=>SetimageModal(true)}
        className='post-image-real-modal' 
         /> : null }
        

      </Modal>
        
    </div>
    
  ) : <></>

 
}
