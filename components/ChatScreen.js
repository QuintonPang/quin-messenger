import styled from 'styled-components'
import { auth, db } from "../firebase.js"
import { useRouter } from "next/router"
import { Avatar, IconButton } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth"
import MoreVert from '@mui/icons-material/MoreVert'
import AttachFileIcon from "@mui/icons-material/AttachFile"
import { query, addDoc, setDoc, doc,  where, collection,orderBy, serverTimestamp } from 'firebase/firestore'
import Message from "./Message.js"
import { InsertEmoticon } from '@mui/icons-material'
import { useState, useRef } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import getRecipientEmail from "../utils/getRecipientEmail.js"
import TimeAgo from 'timeago-react'

function ChatScreen({chat,messages}) {

    const endOfMessagesRef = useRef(null);

    const router = useRouter();
    const [ input, setInput ] = useState();
    const [ user ] = useAuthState(auth)
    
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
            user: user.email,
            timestamp: serverTimestamp(),
            text: input,
            photoURL: user.photoURL,
        })

        setInput("")
        scrollToBottom()
    }

    const chatRef = doc(db,'chats',router.query.id);
    // returns something even if no data is found
    const [ messagesSnapshot ] = useCollection(query(collection(chatRef,'messages'),orderBy("timestamp","asc")))
    const [ recipientSnapshot ] = useCollection(
        query(collection(db,
                "users"),
                where("email","==",getRecipientEmail(JSON.parse(chat).users,user))
                )
        )
    
    const scrollToBottom = () =>{
        endOfMessagesRef?.current?.scrollIntoView({
            behaviour:"smooth",
            block:"start",
        })
    }

    const showMessages = () =>{

        if(messagesSnapshot){
           
            return messagesSnapshot.docs.map(msg=>
                <Message
                key={msg.id}
                user={msg.data().user}
                message={{...msg.data(),timestamp:msg.data().timestamp?.toDate().getTime()}}
                />
                )
    
        }else{
            // server-side rendered
            return JSON.parse(messages).map(msg=>
                <Message 
                key={msg.id} 
                user={msg.user} 
                message={{...msg}}
                />
            )
        }
    
    
    }


    // chat is in json format
    // console.log(JSON.parse(chat).users)

    const recipient = recipientSnapshot?.docs?.[0]?.data()
  
    const recipientEmail = getRecipientEmail(JSON.parse(chat).users,user)
    return (
        <Container>
            <Header>
                {recipient?
                <Avatar src={recipient.photoURL}/>:
                <Avatar>{recipientEmail[0]}</Avatar>}
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot?
                    <p>Last seen:{" "} {recipient?.lastSeen?.toDate()?<TimeAgo datetime={recipient?.lastSeen?.toDate()}/>:"Unavailable"}</p>
                    :<p>Loading last seen...</p>
                    }
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
                <EndOfMessages ref={endOfMessagesRef}/>
                {scrollToBottom()}
            </MessageContainer>
            <InputContainer>
                    <IconButton>
                        <InsertEmoticon/>
                    </IconButton>
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
    z-index:100;
    top:0;
    display:flex;
    padding:11px;
    height: 80px;
    align-items:center;
    border-bottom: 1px solid whitesmoke;
    opacity:0.75;
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
    overflow-y:scroll;

    // not show scrollbar
    ::-webkit-scrollbar{
        display:none
    }

    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // firefox
`

const EndOfMessages = styled.div`
    margin-bottom:5px;
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
