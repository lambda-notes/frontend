import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

//Conflux
import { useStateValue } from 'react-conflux';

import { globalContext } from '../../store/contexts';
import { SET_USER } from '../../store/constants';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebaseConfig from './firebaseConfig';
import { url } from '../Auth/config';
let firebase = require('firebase/app');
require('firebase/auth');

firebase.initializeApp(firebaseConfig);
let provider = new firebase.auth.GithubAuthProvider();
provider.addScope('read:user');
firebase.auth().useDeviceLanguage();

const Landing = () => {
  const [state, dispatch] = useStateValue(globalContext);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        let userProfile = {
          accountType: 1,
          // uid: user.uid,
          email: user.email,
          // photo: user.photoURL,
          firstName: user.displayName,
          lastName: 'lastName',
          gihubId: 'mlanders',
          token: token,
          cohortID: 1
        };
        let config = {
          headers: { Authorization: `token ${token}` }
        };
        console.log(token);
        console.log(user);
        axios
          .post(
            `https://lambda-school-notes.herokuapp.com/api/auth/firebase`,
            userProfile
          )
          .then(async res => {
            console.log(res.message);
            let other = await axios.get('https://api.github.com/user', config);
            console.log(other);
          })
          .catch(err => console.log(err.message));

        // axios.get('https://api.github.com/user', config);
        dispatch({ type: SET_USER, payload: userProfile });
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        let userProfile = {
          uid: '',
          email: '',
          photo: '',
          name: ''
        };
        dispatch({ type: SET_USER, payload: userProfile });
        // history.push('/');
        console.log('Signout success!');
      })
      .catch(function(error) {
        // An error happened.
        console.error('Signout Error', error);
      });
  };
  console.log(state.user);
  return (
    <Styles>
      <div className="LoginButton" onClick={handleLogin}>
        Login
      </div>
      <div className="LoginButton" onClick={handleLogout}>
        Logout
      </div>
    </Styles>
  );
};
const Styles = styled.div`
  .LoginButton {
    width: 70px;
    padding: 5px 10px;
    margin: 20px;
    text-align: center;
    border: 1px solid black;
    border-radius: 4px;
    cursor: pointer;
    background-color: #fff;
  }
`;

export default Landing;
