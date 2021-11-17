import firebase from 'firebase/compat/app';
import '../styles/globals.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import {db, auth} from '../firebase';
import Login from './login'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);


  useEffect(()=>{
if(user){
  db.collection('users').doc(user.uid).set(
    {
      user:user.email,
      photoURL:user.photoURL,
      lastSeen:firebase.firestore.FieldValue.serverTimestamp()
    }
  ,
  {
    merge:true
  })
}
  },[user])

  if(loading) return (<h1>Loading...</h1>)

  if(!user){
    return <Login/>
  }

  return <Component {...pageProps} />
}

export default MyApp
