import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config= {
    apiKey: "AIzaSyBK2gEcdQLpIkcSuJn8FdNDdkBhyyXY8OE",
    authDomain: "crwn-db-86e3c.firebaseapp.com",
    databaseURL: "https://crwn-db-86e3c.firebaseio.com",
    projectId: "crwn-db-86e3c",
    storageBucket: "crwn-db-86e3c.appspot.com",
    messagingSenderId: "326464843009",
    appId: "1:326464843009:web:dc777d85157a7b3205bf00",
    measurementId: "G-M2BRKM76KS"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try { 
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle =() => auth.signInWithPopup(provider);

  export default firebase;
