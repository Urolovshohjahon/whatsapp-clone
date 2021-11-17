import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

function login() {
  const signIn = () => {
    auth.signInWithPopup(provider);
  };

  return (
    <Container>
      <Head>
        <title>Login panel</title>
      </Head>
      <LoginContainer>
        <Logo src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png' />
        <Button onClick={signIn} variant='outlined'>
          Sign In with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgb(0, 0, 0, 0.7);
`;
const Logo = styled.img`
    width:200px;
    height:200px;
    margin-bottom:50px;
`;
