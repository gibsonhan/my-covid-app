import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import * as firebase from "firebase";
import { signInWithEmailAndPassword, signInWithFacebook, signInWithGoogle } from "util/accountHelper";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const Account: React.FC<{}> = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  const handleSignInWithEmailAndPassword = () => signInWithEmailAndPassword(email, password)
  const handleSignInWithFB = () => signInWithFacebook()
  const handleSignInWithGoogle = () => signInWithGoogle()

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  if (initializing) return null;
  if (!user) {
    return (
      <View style={styles.root}>
        {console.log(user)}
        <Text>Hello</Text>
        <TextInput />
        <TextInput />
        <Button title="Login" onPress={handleSignInWithEmailAndPassword} />
        <Button title="Login with FB" onPress={handleSignInWithFB} />
        <Button title="Login With Google" onPress={handleSignInWithGoogle} />
      </View>
    );
  }
  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="sign out" onPress={handleSignOut} />
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
