import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TextPropTypes, View } from "react-native";

import firebase from '../util/firebaseHelper'
import Toast from 'react-native-toast-message'
import {
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter
} from "../util/accountHelper"

const Account: React.FC<{}> = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const currIdToken = firebase.auth().currentUser?.getIdToken()
  }, [user])

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
