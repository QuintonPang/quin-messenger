import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth,db } from "../firebase.js"
import Login from "./login.js"
import Loading from "../components/Loading.js"
import firebase from "firebase/compat/app"

function MyApp({ Component, pageProps }) {
  const [ user, loading, error ] = useAuthState(auth)
  
  useEffect(()=>{
    if(user){
      db.connection('users').doc(user.uid).set({
        email:user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL : user.photoURL,
      }, {merge:true}
      )
    }
  },[user])

  if (loading) return <Loading/>;

  if(!user) return <Login/>;

  return <Component {...pageProps} />
}

export default MyApp
