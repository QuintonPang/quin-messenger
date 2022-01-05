import styled from 'styled-components'
import Head from "next/head"
import Sidebar from "../../components/Sidebar.js"
import ChatScreen from "../../components/ChatScreen.js"
import { db, auth } from "../../firebase.js"
import { doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore'
import { useAuthState }  from "react-firebase-hooks/auth"
import getRecipientEmail from "../../utils/getRecipientEmail.js"

function Chat({chat,messages}) {

    const [user] = useAuthState(auth)

    console.log(chat, messages)

    return (
        <Container>
            <Head>
                <title>Chat with {chat.users&&getRecipientEmail(chat.users,user)}</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>

        </Container>
    )
}

export default Chat


export async function getServerSideProps(context){
    const chatRef = doc(db,'chats',context.query.id);
   
    // prepare the messages on the server
    const chatDoc = await getDoc(chatRef,orderBy("timestamp","asc"))

    
    const chat = {
        id: chatDoc?.id,
        ...chatDoc?.data(),
    }

    // console.log(chat);
    
    const querySnapshot = await getDocs(collection(chatRef,'messages'))
    
    const messages = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        messages.push({

            id: doc.id,
            timestamp:doc.data().timestamp?.toDate().getTime(),
            ...doc.data(),

        })
        
    });

    // console.log(messages);
    
    
    return{
        props:{
            chat: JSON.stringify(chat),
            messages: JSON.stringify(messages),
        }
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const ChatContainer = styled.div`
    flex: 1;
    overflow:scroll;
    height: 100vh;

    // not show scrollbar
    ::-webkit-scrollbar{
        display:none
    }

    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // firefox
`

