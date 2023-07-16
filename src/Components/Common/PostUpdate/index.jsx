import React, {useMemo} from 'react'
import "./index.scss"
import ModalComponent from "../Modal/index"
import { postStatus,GetStatus, UpdateStatus } from '../../../API/FirestoreAPI';
import {uploadPostImageAPI} from "../../../API/ImageUpload"
import PostsCard from '../PostsCard';


export default function PostStatus({currentUser}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [Status, SetStatus] = React.useState("");
    const [AllStatus, setAllStatus] = React.useState([])
    const [isEdit, SetisEdit] = React.useState(false)
    const [CurrentPost, Setcurrentpost] = React.useState({})
    const [postImage, SetpostImage] = React.useState("")
    const [progress, Setprogress] = React.useState(0)

    // console.log(postImage)

    async function SendStatus() {
      await postStatus(Status,currentUser,postImage)
      SetStatus("")
      SetisEdit(false)
      setModalOpen(false)
    }
     
    function getEditData(posts) {
      Setcurrentpost(posts)
      SetStatus(posts.status)
      SetisEdit(true)
      setModalOpen(true)
    }

    function updateStatus() {
      UpdateStatus(CurrentPost.id, Status,postImage )
      setModalOpen(false)
    }

   useMemo(()=>{
    GetStatus(setAllStatus)
   },[])
   
  

  return (
    <div className='post-container'>
      <div className="user-details">
        <img className="pofile-image" src={currentUser.imageLink} alt='No Profile img'/>
        <h4>{currentUser.name}</h4>
        <p className='headline'>{currentUser.headline}</p>

      </div>
        <div className='Post-Status'>
           <img className="post-status-prof-img" src={currentUser.imageLink} alt='No Profile img'/>
           <button className='open-Post-modal' onClick={() => {
            setModalOpen(true)
            SetisEdit(false)
           }}>
            Start a Post
           </button>
           
           <ModalComponent 
           SetStatus = {SetStatus}
           Status = {Status}
           modalOpen={modalOpen}
           setModalOpen={setModalOpen}
           SendStatus = {SendStatus}
           isEdit={isEdit}
           updateStatus={updateStatus}
           uploadPostImageAPI={uploadPostImageAPI}
           SetpostImage={SetpostImage}
           postImage={postImage}
           Setprogress={Setprogress}
           progress={progress}
           CurrentPost={CurrentPost}
           Setcurrentpost={Setcurrentpost}
           />
          

        </div>

        <div className='Post-dad'>
            {AllStatus.map(post => {
              return (
                <div className='post'>
                <PostsCard posts = {post} getEditData={getEditData}/>
                </div>
              ) 
            })}
          </div>
    </div>
  )
}
