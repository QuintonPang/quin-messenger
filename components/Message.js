import styled from 'styled-components'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase.js"
import moment from 'moment'

function Message({user, message}) {

    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user===userLoggedIn.email? Sender : Receiver;

    return (
        <Container>
            <TypeOfMessage>
                {message.text}
                <Timestamp>
                {message.timestamp?
                    moment(message.timestamp).format("LT")
                    :
                    "Just now"
                }
                </Timestamp>
            </TypeOfMessage>
        </Container>
    )
}

export default Message

const Container = styled.div`
`

const MessageElement = styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 25px;
    position: relative;
    text-align: right;
`

const Sender = styled(MessageElement)`
    background-color: pink;
    margin-left: auto;
`

const Receiver = styled(MessageElement)`
    background-color: whitesmoke;
    text-align: left;
`

const Timestamp = styled.span`
    color:gray;
    padding: 10px;
    font-size:9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right:0;
`
