import React from 'react'
import  "./index.scss"
import {AiOutlineCloseCircle} from "react-icons/ai"

export default function SearchUsers({SetisSearch,SetsearchInput}) {
  return (
    <div className='searchUsers'>
          <input 
          onChange={(e) => SetsearchInput(e.target.value)}
          placeholder='Search Users...' /> 

           <AiOutlineCloseCircle size={25} className='close-icon'
           onClick={() => {
            SetisSearch(false)
            SetsearchInput("")
           }
          }
           />
          
    </div>
  )
}
