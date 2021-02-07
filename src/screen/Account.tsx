import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import * as firebase from "firebase";
import Toast from 'react-native-toast-message'
import { signInWithEmailAndPassword, signInWithFacebook, signInWithGoogle, signInWithTwitter } from "../util/accountHelper"

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const Account: React.FC<{}> = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    const isAppInit = firebase.apps.length > 0
    console.log(isAppInit)

    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleSignInWithEmailAndPassword = async () => {
    const resposne = await signInWithEmailAndPassword(email, password)
  }

  const handleSetEmail = async (text: string) => setEmail(text)
  const hanldeSetPassword = async (text: string) => setPassword(text)
  const handleSignInWithFB = async () => signInWithFacebook()
  const handleSignInWithGoogle = async () => signInWithGoogle()
  const handleSignInTwitter = async () => signInWithTwitter()

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
        <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} />
        <TextInput style={styles.textInput} onChangeText={handleSetEmail} />
        <TextInput style={styles.textInput} onChangeText={hanldeSetPassword} />
        <Button title="Login" onPress={handleSignInWithEmailAndPassword} />
        <Button title="Login with Facebook" onPress={handleSignInWithFB} />
        <Button title="Login With Google" onPress={handleSignInWithGoogle} />
        <Button title="Login With Twitter" onPress={handleSignInTwitter} />
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
    alignItems: "center",
  },
  textInput: {
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  toast: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0
  }
});

export default Account;
