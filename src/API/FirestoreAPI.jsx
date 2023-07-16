import {firestore} from "../FirebaseConfig"
import { toast } from 'react-toastify';
import {addDoc, collection, onSnapshot, doc,setDoc, updateDoc,query,where, deleteDoc,getDoc} from "firebase/firestore"
import {getCurrentTimeStamp} from "../Helpers/useMoment"
import getUniqueID from "../Helpers/getUniqueID"

let postRef = collection(firestore,"posts") 
let userRef = collection(firestore,"users")
let likeRef = collection(firestore,"likes")
let commentRef = collection(firestore, "comments" )
let connectionsRef = collection(firestore,"connections")

export function  postStatus(Status,currentUser,postImage) {
    // let userEmail = localStorage.getItem("userEmail")
    let Obj = {
        status : Status,
        time: getCurrentTimeStamp("LLL"),
        userEmail : currentUser.email,
        UserName : currentUser.name,
        postID : getUniqueID(),
        userID: currentUser.Userid,
        postImage: postImage,

    }
    addDoc(postRef,Obj)
    .then(res => toast.success("Post added Successfully!"))
    .catch(err => toast.warning("Couldn't add You're Post")) 
}


export function GetStatus(setAllStatus) {
    
    onSnapshot(postRef, res => {
        setAllStatus(res.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        }))
    })
}

export function getAllUsers(setAllUsers) {
    onSnapshot(userRef, res => {
        setAllUsers(res.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        }))
    })
}




export function postUserData(object) {
    addDoc(userRef,object)
    .then(() => {})
    .catch(e => console.log(e))
}

export function getCurrentUser(SetcurrentUser) {
    // let currentuser = localStorage.getItem("userEmail");
    onSnapshot(userRef, res => {
        SetcurrentUser(res.docs.map(doc => {
            return {...doc.data(), Userid: doc.id}
        }).filter(item => item.email === localStorage.getItem("userEmail"))[0]
        )
    })
}


export const EditProfile = (Userid, payload) => {
    let usertoEdit = doc(userRef, Userid)

    updateDoc(usertoEdit, payload )
    .then(() => {
        toast.success("Profile Updated Successfully!")

    })
    .catch(e => console.log(e))

} 

  



export const getSingleStatus = (setAllStatus,id) => {
    const singlePostQuery = query(postRef, where("userID", "==", id))
    onSnapshot(singlePostQuery, res => {
        setAllStatus(res.docs.map(doc => {
            return {...doc.data(), id:doc.id}
            
        }))
    })
}


export const getSingleUser = (setCurrentProfile,email) => {
    const singlePostQuery = query(userRef, where("email", "==", email))
    onSnapshot(singlePostQuery, res => {
        setCurrentProfile(res.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        })[0]
        )
    })
}



export const LikePost = (userId,postId,liked) => {
    try{
    let docTolike  = doc(likeRef, `${userId}_${postId}`)
    if(liked) {
        deleteDoc(docTolike)

    } else {        
    setDoc(docTolike,{userId,postId})
    }

   } catch(e) {
    console.log(e)
   }

}

export const getLikesbyUser = (userId,postId,setliked,setlikesCount) =>{
    try{
        let likeQuery = query(likeRef,where("postId","==", postId))
        onSnapshot(likeQuery, res => {
            let likes = res.docs.map(doc => doc.data())
            // console.log(likes)
            let likeCount = likes.length;
            const isLiked = likes.some(like => like.userId === userId )

            setlikesCount(likeCount)
            setliked(isLiked)
        })

    } catch(e) {
        console.log(e)
    }

}







export const PostComment = (postId, comment, timeStamp, userId, name) => {
    try{
        addDoc(commentRef, {
            postId,
            comment,
            timeStamp,
            userId,
            name
        })

    } catch(e){
        console.log(e)
    }
}


export const getComments = (postId, Setactualcomment) => {
    try{
        let SinglePostQuery = query(commentRef, where("postId", "==", postId))


        onSnapshot(SinglePostQuery, res => {
            const comments = res.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            Setactualcomment(comments)

        })

    } catch(e) {
        console.log(e)
    }

}



export function UpdateStatus(id, status, postImage){
    let doctoUpdate = doc(postRef, id)


    try{
    updateDoc(doctoUpdate, {status, postImage})
    toast.success("Post Updated Successfully!")
    }
    catch(e) {
        console.log(e)
        toast.warning("Couldn't update Post")
    }

} 




export function deletePost(id) {
    let Doctodelete = doc(postRef,id)

    try{
        deleteDoc(Doctodelete)
        toast.success("Post deleted successfully!")
    } catch(e){
        console.log(e)
    }
}



export const addConnection = (userId,targetId) => {
    try{
    let docTolike  = doc(connectionsRef, `${userId}_${targetId}`)
          
    setDoc(docTolike,{userId,targetId})
    toast.success("Connection added!")
    

   } catch(e) {
    console.log(e)
   }

}






export function TryGetAllConnections(setAllconnections) {
    
    onSnapshot(connectionsRef, res => {
        setAllconnections(res.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        }))
    })
}



export const getConnections = (userId,targetId,Setisconnected) =>{
    try{
        let connectionQuery = query(connectionsRef,where("targetId","==", targetId))

        onSnapshot(connectionQuery, res => {
            let Connections = res.docs.map(doc => doc.data())
            
            
            const isConnected = Connections.some(connection => connection.userId === userId )

            Setisconnected(isConnected)
        })

    } catch(e) {
        console.log(e)
    }

}