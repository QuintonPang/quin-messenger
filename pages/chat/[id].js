import styled from 'styled-components'
import Head from "next/head"
import Sidebar from "../../components/Sidebar.js"
import ChatScreen from "../../components/ChatScreen.js"
import { db } from "../../firebase.js"
import { doc, getDoc, collection, query, orderBy } from 'firebase/firestore'

function Chat({chat,messages}) {

    console.log(chat, messages)
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen/>
            </ChatContainer>

        </Container>
    )
}

export default Chat

/* TODO: Fix Error 
export async function getServerSideProps(context){
    const ref = doc(db,'chats',context.query.id);
   
    // prepare the messages on the server
    const messagesRef = await getDoc(ref,orderBy("timestamp","asc"))
    
    const messages = messagesRef.map(doc=>({
        id: doc.id,
        ...doc.data(),
    })).map(msg=>({
        ...msg,
        timestamp: msg.timestamp.toDate().getTime()
    }))

    const chatRes = await ref.get();
    const chat = {
        id: chatRes,
        ...chatRes.data()
    }
    
    return{
        props:{
           // messages: JSON.stringify(messages),
           // chat: chat
        }
    }
}
*/
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

