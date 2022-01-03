import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import ChatIcon from '@mui/icons-material/Chat'
import SearchIcon from '@mui/icons-material/Search'
import * as EmailValidator from 'email-validator'

const Sidebar = () =>{

    const createChat = () =>{
        const input = prompt("Please enter an email address you want to chat with: ");
        if (!input) return null;
        if(EmailValidator.validate(input)){

        }
    }
    return(
        <Container>
           <Header>
                <UserAvatar/>
                <IconsContainer>
                    <IconButton>
                      <MoreVert/>
                    </IconButton>
                    <IconButton>
                      <ChatIcon/>
                    </IconButton>
                </IconsContainer>
            </Header> 

            <Search>
                <SearchIcon/>
                <SearchInput onClick={()=>createChat()} placeholder="Search in chat"/>
            </Search>

            <SidebarButton>
                START A NEW CHAT
            </SidebarButton>

        </Container>
    )
}

export default Sidebar;

const Container = styled.div`

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