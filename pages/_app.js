import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth,db } from "../firebase.js"
import Login from "./login.js"
import Loading from "../components/Loading.js"
import firebase from "firebase/compat/app"
import { useEffect } from 'react';
import { collection, query, where, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import {browserName} from 'react-device-detect'

function MyApp({ Component, pageProps }) {

  console.log(browserName);

  
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
  
  // to redirect to chrome from instagram 
  if((browserName!=="Chrome"&&browserName!=="Edge"&&browserName!=="Samsung Browser"&&browserName!=="Mobile Safari"&&browserName!=="Firefox"&&browserName!=="Internet Explorer"&&browserName!=="Mozilla"&&browserName!=="Opera")||browserName==="Instagram")
  return <button><a href="https://quin-messenger.vercel.app" download>Please use another browser by clicking here</a></button>

  if(!user) return <Login/>;

  return <Component {...pageProps} />
}

export default MyApp
