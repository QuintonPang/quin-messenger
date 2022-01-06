import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import ChatIcon from '@mui/icons-material/Chat'
import SearchIcon from '@mui/icons-material/Search'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase.js'
import { collection, addDoc, where, query } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat.js'
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react"
import getRecipientEmail from '../utils/getRecipientEmail.js'

const Sidebar = () =>{

    const [ wordToBeSearched, setWordToBeSearched ] = useState("")
    const [ user ] = useAuthState(auth);
    const q = query(collection(db,'chats'),where('users','array-contains',user.email))
    const [ chatsSnapshot ] = useCollection(q)

    const createChat = () =>{
        const input = prompt("Please enter an email address you want to chat with: ");
        if (!input) return null;
        // console.log(chatAlreadyExists(input));
        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input!==user.email){
            const c = collection(db,'chats');
            
            // addDoc lets Cloud Firestore auto-generate an ID for you
            // setDoc must include id
            addDoc(c,{
                users: [user.email, input] // sender and recepient

            })

            alert("New chat created!")
        }else{
            alert("User already exists in your chat list!")
        }

    }

    const chatAlreadyExists = (recipientEmail) =>
       
       // returns true or false
        !!chatsSnapshot?.docs.find(chat=>
            chat.data().users.find(
                user=>user===recipientEmail
                )
            )

    
    return(
        <Container>
           <Header>
                <UserAvatar src={user.photoURL} />
                <IconsContainer>
                    <IconButton>
                      <MoreVert/>
                    </IconButton>
                    <IconButton>
                      <ChatIcon/>
                    </IconButton>
                    <IconButton sx={{color:"red"}} onClick={()=>{confirm("Log out?")&&auth.signOut()}}>
                      <LogoutIcon/>
                    </IconButton>
                </IconsContainer>
            </Header> 

            <Search>
                <SearchIcon/>
                <SearchInput value={wordToBeSearched} onChange={(e)=>setWordToBeSearched(e.target.value)} placeholder="Search in chat"/>
            </Search>

            <SidebarButton sx={{"&:hover":{backgroundColor:"#f2d5f2",color:"White"},color:"pink"}} onClick={()=>createChat()}>
                START A NEW CHAT
            </SidebarButton>

            {/*List of chats*/}
            {chatsSnapshot?.docs.map(chat=>{
                return chat.data().users.find((u)=>u===getRecipientEmail(chat.data().users,user)).includes(wordToBeSearched)&&(
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            )})}

        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    min-height: 350px;
    overflow-y: scroll;
`;

const Header = styled.div`
    display:flex;
    position:sticky;
    background-color: white;
    z-index:1;
    justify-content: space-between;
    align-items:center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`

    cursor: pointer;

    :hover{
        opacity:0.8;
    }
`;

const IconsContainer = styled.div`
`;

const Search = styled.div`
    display:flex;
    align-items:center;
    padding:20px;
    border-radius:2px;
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`

const SidebarButton = styled(Button)`
    width:100%;
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;