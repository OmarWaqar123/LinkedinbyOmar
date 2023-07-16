import React from 'react'
import { Button, Modal,Progress } from 'antd';
import { useState } from 'react';
import "./index.scss"

export default function FileUploadModal({modalOpen,setModalOpen, handlefile, UploadImage, currentImage, progress }) {
  return (
    <div>
        <Modal
        title="Add a Profile Image"
        className='modal-omar'
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
            
            <Button disabled={!currentImage.name} key="submit" type="primary" onClick={UploadImage}>
              Upload profile picture
            </Button>,
            
          ]}
      >
        <div className='file-upload-main'>
         <p>{currentImage.name}</p>
         <label for="upload-img-input">Add an Image</label>

         <div className='progress-bar'>
         { progress !== 0 ?  <Progress type="circle" percent={progress} size={70} /> : null }
         </div>

        <input hidden id="upload-img-input" type='file' onChange={handlefile}/>
        </div>
      </Modal>


    </div>
  )
}
