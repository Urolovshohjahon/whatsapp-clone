import styled from 'styled-components';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db, provider} from '../firebase'
import moment from 'moment'


function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user===userLoggedIn.email?Sender:Receiver;

const Container = user===userLoggedIn.email?Container1:Container2;
    return (
        <Container>
            <TypeOfMessage>
                {message.message}
                <Timestamp>{message.timestamp?moment(message.timestamp).format("LT"):"..."}</Timestamp>
                </TypeOfMessage>
        </Container>
    )
}

export default Message
const Container1 = styled.div`
display:flex;
justify-content:flex-end;
`;
const Container2 = styled.div`
display:flex;
justify-content:flex-start;
`;

const MessageElement = styled.div`
    width:fit-content;
    padding:15px;
    border-radius:8px;
    margin:10px;
    min-width:60px;
    padding-bottom:26px;
    position:relative;
    text-align: right;
`
const Sender = styled(MessageElement)`
    text-align:right;
    background-color:#dcf8c6;
`;

const Receiver = styled(MessageElement)`
    background-color:whitesmoke;
    text-align:left;
`
const Timestamp = styled.span`
    color:gray;
    padding:10px;
    font-size:9px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0;
    
`