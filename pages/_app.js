import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth,db } from "../firebase.js"
import Login from "./login.js"
import Loading from "../components/Loading.js"
import firebase from "firebase/compat/app"
import { useEffect } from 'react';
import { collection, query, where, setDoc, doc, serverTimestamp } from 'firebase/firestore'

function MyApp({ Component, pageProps }) {

  // to redirect to chrome from instagram 
  if(navigator.userAgent.includes("Instagram")){
    window.location.href = "quin-messenger.vercel.app"
  }
  
  // useAuthState returns array of 3, first is user, second is loading, third is error 
  const [ user, loading, error ] = useAuthState(auth)
  
  useEffect(()=>{
    if(user){
      
      const c = collection(db, 'users')
      
      setDoc(doc(c,user.uid),{
        email:user.email,
        lastSeen: serverTimestamp(),
        photoURL : user.photoURL,
      },
      { merge:true } // update fields if exists
     )

    }

  },[user])

  if (loading) return <Loading/>;

  if(!user) return <Login/>;

  return <Component {...pageProps} />
}

export default MyApp
