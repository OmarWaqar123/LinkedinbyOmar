import {signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import {auth} from "../FirebaseConfig"

export const LoginAPI = (email, password) => {
   try {
   let response = signInWithEmailAndPassword(auth,email,password)
   return response
   } catch (e){
      return e
   }
}


export const RegisterAPI = (email, password) => {
   try {
      let response = createUserWithEmailAndPassword(auth, email, password)
      return response
   } catch (e) {
      return e
   }
}


export const GoogleSigninAPI = () => {
   try{
      let googleProvider = new GoogleAuthProvider()
      let res = signInWithPopup(auth, googleProvider)
      return res 
   }catch(e){
      return e
   }
}


export const onLogout = () => {
     try{
      signOut(auth)

     }catch(e){
       console.log(e)
     }
}