import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { auth } from '../firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'
import  getRecipientEmail  from '../utils/getRecipientEmail.js'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, where, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from "next/router"

function Chat({id,users}) {

    const router = useRouter();

    
    const q = query(collection(db,'users'),where('email','==',getRecipientEmail(users,useAuthState(auth)[0])))
    const [ recipientsSnapshot ] = useCollection(q)
    
    // useAuthState returns array of 3, first is user, second is loading, third is error 
    // console.log(useAuthState(auth)[0].email);
    
    const recipientEmail = getRecipientEmail(users,useAuthState(auth)[0])
    const recipient = recipientsSnapshot?.docs?.[0]?.data()
    
    const enterChat = () =>{
        router.push("/chat/"+id)
    }
    return (
        <Container onClick={()=>enterChat()}>
            { recipient? 
                <UserAvatar src={recipient?.photoURL}/>         
            :
                <UserAvatar>{recipientEmail[0]}</UserAvatar>         
            }

            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display:flex;
    align-items: center;
    cursor:pointer;
    padding: 15px;
    word-break:break-word;

    :hover{
        background-color: #ff00ff;
    }
`
const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`
