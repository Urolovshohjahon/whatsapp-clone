import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import getRecipientEmail from '../utils/getRecipientEmail';
import { auth, db, provider } from '../firebase';
import {useRouter} from 'next/router'

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(users, user);
  const enterChat = ()=>{
      router.push(`/chat/${id}`)
  }

  return (
    <Container onClick={enterChat} >
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar src={recipientEmail[0]} />
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  word-break: break-word;
  padding: 15px;
  :hover {
    background-color: #e9eeab;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
