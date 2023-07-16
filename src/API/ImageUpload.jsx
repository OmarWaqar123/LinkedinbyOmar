import {storage} from "../FirebaseConfig"
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage"
import { EditProfile } from "./FirestoreAPI"

export function uploadImageAPI(file,Userid,setModalOpen,Setprogress, SetcurrentImage) {
    const profilePicRef = ref(storage, `ProfileImages/${file.name}`)
    const uploadTask = uploadBytesResumable(profilePicRef,file)

    uploadTask.on("state_changed", snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        
        // console.log(progress)
        Setprogress(progress)
    },(e) => {
        console.error(e)
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then(res =>{
            EditProfile(Userid, {imageLink : res})
            setModalOpen(false)
            SetcurrentImage({})
            Setprogress(0)

        })
    })
}


export function uploadPostImageAPI(file,SetpostImage,Setprogress) {
    const postPicRef = ref(storage, `PostImages/${file.name}`)
    const uploadTask = uploadBytesResumable(postPicRef,file)

    uploadTask.on("state_changed", snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        
        Setprogress(progress)

    },(e) => {
        console.error(e)
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then(res =>{
            SetpostImage(res)

        })
    })
}

