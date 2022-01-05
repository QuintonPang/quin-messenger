import styled from 'styled-components'
import { auth, db } from "../firebase.js"
import { useRouter } from "next/router"
import { Avatar, IconButton } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth"
import MoreVert from '@mui/icons-material/MoreVert'
import AttachFileIcon from "@mui/icons-material/AttachFile"
import { addDoc, setDoc, doc, getDoc, collection, query, orderBy, getDocs, serverTimestamp } from 'firebase/firestore'
import Message from "./Message.js"
import { InsertEmoticon } from '@mui/icons-material'
import { useState } from "react"

function ChatScreen({chat,messages}) {

    const router = useRouter();
    const [ input, setInput ] = useState();
    const sendMessage = (e)=>{
        e.preventDefault();
        
        const userCollection = collection(db, 'users')
        
        // update last seen
        setDoc(doc(userCollection,user.uid),{
            lastSeen: serverTimestamp(),
        },
        { merge:true } // update fields if exists
        )
        const messageCollection = collection(db,"chats",router.query.id,"messages")
        addDoc(messageCollection,{
           timestamp: serverTimestamp(),
           text: input,
        })

        setInput("")
    }
    const showMessages = () =>{
        const chatRef = doc(db,'chats',router.query.id);
        getDocs(collection(chatRef,'messages'),orderBy("timestamp","asc")).then((messagesSnapshot)=>{
        if(messagesSnapshot){
            let messages = []
            messagesSnapshot.forEach(doc=>{
                messages.push(doc)
            } )
            messages.map(msg=>{
                return
                <Message 
                key={msg.id} 
                user={msg.data().user} 
                message={{...msg.data(),timestamp:msg.data().timestamp?.toDate().getTime()}}
                />
            })

    
        }else{
            // server-side rendered
            return JSON.parse(messages).map(msg=>
                <Message 
                key={msg.id} 
                user={msg.user} 
                message={{...msg}}
                />
            )
        }})
    }

    const [ user ] = useAuthState(auth)
    return (
        <Container>
            <Header>
                <Avatar/>
                <HeaderInformation>
                    <h3>Rec Email</h3>
                    <p>Last seen...</p>
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}

                {/* scrolls to bottom trick*/}
                <EndOfMessages/>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticon/>
                <Input value={input} onChange={(e)=>setInput(e.target.value)}/>
                <button hidden disabled={!input} type="submit" onClick={(e)=>sendMessage(e)}>Send Message</button>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
`

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index:100px;
    top:0;
    display:flex;
    padding:11px;
    height: 80px;
    align-items:center;
    border-bottom: 1px solid whitesmoke;
`
const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    >h3{
        margin-bottom: 3px;
    }

    >p{
        font-size: 14px;
        color: gray;
    }
`

const HeaderIcons = styled.div`
`

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height:90vh;

    // not show scrollbar
    ::-webkit-scrollbar{
        display:none
    }

    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // firefox
`

const EndOfMessages = styled.div`
`

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom:0;
    background-color: white;
    z-index:100;
`

const Input = styled.input`
    flex:1;
    align-items:center;
    padding:10px;
    position: sticky;
    padding: 20px;
    margin-left: 15px;
    margin-right : 15px;
    background-color: whitesmoke;
`