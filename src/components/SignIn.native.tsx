import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
//libaries
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
//components
import Bttn from './common/Bttn'
import Input from './common/Input'
//helper util
import { Context } from '../store/AppContext'
import firebase from '../util/firebaseHelper'
import { signInWithEmailAndPassword } from '../util/accountHelper'
import { COVID } from '../reserve/data/screenName'

function SignIn() {
    //context
    const store = useContext(Context)
    const { SIGN_IN } = store.DISPATCH
    const navigation = useNavigation()
    //state
    const [initializing, setInitializing] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //init firebase
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return () => subscriber;
    }, [])

    //all handler function bellow here
    const handleSetEmail = (text: string) => setEmail(text)
    const hanldeSetPassword = (text: string) => setPassword(text)
    const handleSignInWithEmailAndPassword = async () => {
        try {
            const inputs = { email, password }
            const resposne = await signInWithEmailAndPassword(inputs)
            if (resposne.error) throw resposne
        }
        catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: error.message,
                text2: 'Please try again  👋 ',
                visibilityTime: 3000,
                topOffset: 100
            });
        }
    }
    //all helper function belowe here
    async function onAuthStateChanged(user: any) {
        if (initializing) setInitializing(false);
        if (user) {
            const currIdToken = await firebase.auth().currentUser?.getIdToken()
            await SIGN_IN(currIdToken)
            navigation.navigate(COVID)
        }
    }

    if (initializing) return <Text>Loading ... </Text>
    return (
        <View style={styles.root}>
            <Input
                value={email}
                placeholder="email"
                autocorrect={false}
                onChangeText={handleSetEmail}
            />
            <Input
                value={password}
                placeholder="password"
                autocorrect={false}
                onChangeText={hanldeSetPassword}
            />
            <Bttn
                title="Login"
                height={60}
                width={120}
                onPress={handleSignInWithEmailAndPassword}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'red'
    },
})

export default SignIn;
