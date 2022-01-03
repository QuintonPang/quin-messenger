import styled from 'styled-components'
import Head from "next/head"
import {Button} from "@mui/material"
import { auth, provider } from "../firebase"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {

    const signIn = ()=>{
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            // const user = result.user;
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="logo.png" alt="logo"/>
                <Button onClick={()=>signIn()} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>

    )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items:center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7) ; /* offset-x, offset-y, blur-radius, spread-radius, color */
`

const Logo = styled.img`
    height: 200px;
    width: 240px;
    margin-bottom: 50px;
`