import styled from 'styled-components';
import { Avatar, IconButton, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat'

function Sidebar() {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);

  const [chatsSnapshot] = useCollection(userChatRef);

  const chatAlreadyExists = (recipientEmail) => 
    chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  
  const createChat = () => {
    const input = prompt('Yozishmoqchi bo`lgan odam emailini kiriting...');
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search for ...' />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

{
  chatsSnapshot?.docs.map(chat=>(
    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
  ))
}


    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex:0.45;
  border-right:1px solid whitesmoke;
  height:100vh;
  min-width:300px;
  max-width:350px;
  overflow-y:scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Header = styled.div`
    display:flex;
    position:sticky;
    top:0;
    background-color: :white;
    z-index:1;
    justify-content: space-between;
    align-items: center;
    padding:15px;
    height:80px;
    border-bottom:1px solid whitesmoke;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  border: none;
  outline-width: 0;
  flex: 1;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
