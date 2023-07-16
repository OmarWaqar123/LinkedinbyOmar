import React from 'react'
import PostStatus from "../Components/Common/PostUpdate/index"
import "../Sass/HomeComponent.scss"

export default function HomeComponent({currentUser}) {
  return (
    <div className='Home-Comp'>
        <PostStatus currentUser={currentUser}/>
    </div>
  )
}
