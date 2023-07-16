import React,{useMemo} from 'react'
import {AiOutlineLike,AiFillLike,             AiOutlineHeart,
AiFillHeart,AiOutlineComment} from "react-icons/ai"
import { getCurrentTimeStamp } from '../../../Helpers/useMoment'
import { LikePost,getLikesbyUser, PostComment, getComments, getAllUsers
 } from '../../../API/FirestoreAPI'

import "./index.scss"

export default function LikeButton({userId,postId,name}) {
  const [likesCount, setlikesCount] = React.useState(0)
  const [liked, setliked] = React.useState(false)
  const [Showcommentbox, Setshowcommentbox] = React.useState(false)
  const [comment, Setcomment] = React.useState("")
  const [actualComments, Setactualcomment] = React.useState([])
  const [allUsers,SetAllUsers] = React.useState([])


  function handleClick() {
      LikePost(userId,postId,liked)
  }

  function handleComment(e) {
    Setcomment(e.target.value)

  }
  function addcomment() {
    PostComment(postId, comment, getCurrentTimeStamp("LLL"), userId, name); 
    Setcomment("")
    
  }
  
  useMemo(()=>{
    getLikesbyUser(userId,postId,setliked,setlikesCount)
    getComments(postId,Setactualcomment)
    getAllUsers(SetAllUsers)

  },[userId,postId])
   

  // actualComments.map(item => (
     
  //   console.log(allUsers.find(user => user.id === 
  //     item.userId
  //     ))

  // ))
  

  return (
    <div className='Like-container' >
      <p className='likes-count'>{likesCount} People liked</p>
      <div className='hr'>
        <hr/>
      </div>

      <div className='like-comment'>

      <div className='likes-comment-inner' onClick={handleClick}>
       {liked ? <AiFillLike size={30} color='#0a66c2' /> : <AiOutlineLike size={30} />}
       <p className= {liked ? "blue" : "black"}>Like</p>
       </div>

       <div className='likes-comment-inner' onClick={() => Setshowcommentbox(prev => !prev)}>
        <AiOutlineComment size={30} color={Showcommentbox ?"#0a66c2" : "#212121"} /> 
       <p className= {Showcommentbox ? "blue" : "black"}>Comment</p>
       </div> 

       </div>
       

      { Showcommentbox ? <>
       <input 
        placeholder='Add a comment'  className='comment-input'
        value={comment}
        onChange={handleComment}
        name='comment'
        />
      
       <button className='add-comment-btn' onClick={addcomment}>Add Comment</button>

       
       {actualComments.length > 0 ? actualComments.map((comment,index) => {
       
         const user = allUsers.find(user => user.id === comment.userId)
        

         return (
         <div className='all-comment' key={index}>

          <div className='comment-image-wrapper'>
          <img 
          className='comment-image'
          src={user.imageLink} />
          <p className='name'>{comment.name}</p>
          </div>

          <p className='comment'>{comment.comment}</p>
          <p className='timeStamp'>{comment.timeStamp}</p>

          {/* <p>•</p>
           */}
         </div>)
       }) : null}

       </> : null}
    </div>
  )
}
