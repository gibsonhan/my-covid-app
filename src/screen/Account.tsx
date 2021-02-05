import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const Account: React.FC<{}> = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const firebaseConfig = {
    appId: "my-covid-app-b5e88",
    apiKey: "AIzaSyBaXjsFSSWCf-Lr3vSwkYgaQnUA4GFEgLs",
    authDomain: "my-covid-app-b5e88.firebaseapp.com",
    databaseURL: "https://my-covid-app-b5e88-default-rtdb.firebaseio.com/",
    projectId: "project-id",
    //storageBucket: 'project-id.appspot.com',
    //messagingSenderId: 'sender-id',
    //measurementId: 'G-measurement-id',
  };

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleLogin = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
        console.log("it worked");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
  };
  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().languageCode = 'en';

    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }
  if (initializing) return null;
  if (!user) {
    return (
      <View style={styles.root}>
        {console.log(user)}
        <Text>Hello</Text>

        <Button title="Login" onPress={handleLogin} />
        <Button title="Login With Google" onPress={handleSignInWithGoogle} />
      </View>
    );
  }
  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Account;
