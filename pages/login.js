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
        <Container id="background">
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="/logo.png" alt="logo"/>
                <Title>QUIN MESSENGER</Title>
                <Button sx={{"&:hover":{borderColor:"purple",backgroundColor:"#f2d5f2",color:"White"},color:"pink",borderColor:"pink"}} onClick={()=>signIn()} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>

    )
}

export default Login

const Container = styled.div`

@property 
--c1{
    syntax: '<color>';
    inherits: false;
    initial-value:red;
}

@property 
--c2{
    syntax: '<color>';
    inherits: false;
    initial-value:orange;
}

@keyframes
backgroundAnimation{
    0%{ --c1: red; --c2:orange;}
    14.3%{--c1: orange; --c2:yellow;}
    28.6%{--c1: yellow; --c2:green;}
    42.9%{--c1: green; --c2:blue;}
    57.1%{--c1: blue; --c2:indigo;}
    71.4%{--c1: indigo; --c2:purple;}
    85.7%{--c1: purple; --c2:red;}
    100%{ --c1: red; --c2:orange;}
}

    display: grid;
    place-items: center;
    height: 100vh;
    cursor:pointer;
    transition: color 0.5s;
    background: linear-gradient(var(--c1),var(--c2));
    animation: backgroundAnimation 8s;
    animation-iteration-count: infinite;
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

const Title = styled.h3`
    color:purple;
    margin-bottom:30px;
`