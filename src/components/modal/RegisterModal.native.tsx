import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message';

import Bttn from '../common/Bttn'
import Input from '../common/Input'

import { registerWithEmailAndPassword } from '../../util/accountHelper'

function RegisterModal({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleGoBack = () => navigation.goBack()

    const handleSetEmail = (text: string) => setEmail(text)
    const handleSetPassword = (text: string) => setPassword(text)
    const handleSetPassword2 = (text: string) => setPassword2(text)
    const handleRegistration = async () => {
        try {
            const inputs = { email, password, password2 }
            const response = await registerWithEmailAndPassword(inputs)
            if (response.error) throw response

            console.log('checking response', response)
            navigation.navigate('Dashboard')
        }
        catch (error) {
            console.log('what is error', error)
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
    return (
        <View style={styles.root}>
            <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} />
            <Input
                value={email}
                placeholder="Email"
                autocorrect={false}
                onChangeText={handleSetEmail}
            />
            <Input
                value={password}
                placeholder="Password"
                autocorrect={false}
                onChangeText={handleSetPassword}
            />
            <Input
                value={password2}
                placeholder="Enter Password Again"
                autocorrect={false}
                onChangeText={handleSetPassword2}
            />
            <Bttn title="Register" height={40} width={80} onPress={handleRegistration} />
            <Bttn title="Go Back" height={40} width={80} onPress={handleGoBack} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toast: {
        zIndex: 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        left: 0,
        right: 0,
    }
})

export default RegisterModal