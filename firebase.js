import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBmpIwJ1lGS_i-WTrjzEePSf7fUqtnBMk0",
    authDomain: "signal-clone-app-d7eef.firebaseapp.com",
    projectId: "signal-clone-app-d7eef",
    storageBucket: "signal-clone-app-d7eef.appspot.com",
    messagingSenderId: "266920374782",
    appId: "1:266920374782:web:880242f541500eaf45d0af"
  };

  let app;

  if(firebase.apps.length === 0){
      app = firebase.initializeApp(firebaseConfig)
  }
  else{
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};