require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: 'lambda-notes-245416.firebaseapp.com',
  databaseURL: 'https://lambda-notes-245416.firebaseio.com',
  projectId: 'lambda-notes-245416',
  storageBucket: '',
  messagingSenderId: '220374714491',
  appId: '1:220374714491:web:ebb2675ac466653b'
};

export default firebaseConfig;
