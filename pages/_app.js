import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from "../firebase.js"

function MyApp({ Component, pageProps }) {
  const {user} = useAuthState(auth)
  return <Component {...pageProps} />
}

export default MyApp
