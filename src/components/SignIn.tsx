import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TextPropTypes, View } from "react-native";

import * as firebase from "firebase";
import Toast from 'react-native-toast-message'
import {
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter
} from "../util/accountHelper"

/*
Optionally
import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
*/

const Account: React.FC<{}> = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false)

  const firebaseConfig = {
    appId: "my-covid-app-b5e88",
    apiKey: "AIzaSyBaXjsFSSWCf-Lr3vSwkYgaQnUA4GFEgLs",
    authDomain: "my-covid-app-b5e88.firebaseapp.com",
    databaseURL: "https://my-covid-app-b5e88-default-rtdb.firebaseio.com/",
    projectId: "project-id",
    //storageBucket: 'project-id.appspot.com',
    //messagingSenderId: 'sender-id',
    //measurementId: 'G-measurement-id',
  }

  //callback function that triggers when auth state changes. 
  function onAuthStateChanged(user: any) {
    if (user) {
      setUser(user);
    }
    else {
      setUser(false)
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const currIdToken = firebase.auth().currentUser?.getIdToken()
  }, [user])

  function getFirebaseToken() {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged()
    })
  }

  const handleSignInWithEmailAndPassword = async () => {
    const resposne = await signInWithEmailAndPassword(email, password)
  }

  const handleSetEmail = async (text: string) => setEmail(text)
  const hanldeSetPassword = async (text: string) => setPassword(text)
  const handleSignInWithFB = async () => signInWithFacebook()
  const handleSignInWithGoogle = async () => signInWithGoogle()
  const handleSignInTwitter = async () => signInWithTwitter()

  const handleSignOut = () => {
    try {
      firebase.auth().signOut()
    }
    catch {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: `Failed To Log Out`,
        text2: 'Please try again  👋 ',
        visibilityTime: 3000,
        topOffset: 30,
      })
    }
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
    zIndex: 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  }
});

export default Account;
