import { Modal,Button,Progress } from 'antd';
import "./index.scss"
import React from 'react';
import {AiOutlinePicture} from "react-icons/ai"
import ReactQuill from 'react-quill';

const ModalComponent = ({modalOpen,setModalOpen,SetStatus,Status, SendStatus, isEdit, updateStatus,uploadPostImageAPI,SetpostImage,postImage,Setprogress,progress,CurrentPost,Setcurrentpost}) => {
  
  // console.log(progress)
  return (
    <> 
      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false)
          SetStatus("")
          SetpostImage("")
          Setprogress(0)
          Setcurrentpost({})
        }}
        onCancel={() => {
          setModalOpen(false)
          SetStatus("")
          SetpostImage("")
          Setprogress(0)
          Setcurrentpost({})
        }
      }

        footer={[
          <Button
           key="submit"
           type="primary"
           disabled = {!Status}
           onClick={isEdit ? updateStatus : SendStatus}
           >
            {isEdit ? "Update" : "Post"}
          </Button>
          
        ]}
      >
      {/* <textarea 
      placeholder='What do you want to talk about?'
      value={Status}
      onChange={e => SetStatus(e.target.value)}
      className='modal-input'/> */}

      <ReactQuill 
      theme="snow"
      placeholder='What do you want to talk about?'
      value={Status}
      onChange={SetStatus}
      className='modal-input'
      />


      {postImage  || CurrentPost.postImage ?  <img src={postImage || CurrentPost.postImage} className='post-image' alt='post-image' /> : null }
      
      {progress === 0 || progress === 100 ?  <></> : 
      <div className='progress-bar'>
      <Progress type="circle" percent={progress} size={70}/>  
      </div>
    
       }

      
      <label for="upload-image">
        <AiOutlinePicture size={35} className='post-upload-pic'
        color='#0073B1'
        />
        
      </label>
      <input 
      id='upload-image'
      type='file'
      hidden
      onChange={(e)=>{
        e.target.files[0] ? 
        uploadPostImageAPI(e.target.files[0],SetpostImage,Setprogress) : null}
      }
      />
      

      </Modal>
    </>
  );
};
export default ModalComponent;