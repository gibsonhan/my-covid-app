import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TextPropTypes, View } from "react-native";

import Toast from 'react-native-toast-message'
import { registerWithEmailAndPassword } from "../../archive/accountHelper.web"

interface RegisterInterface {
    navigation: any
}

const RegisterModal: React.FC<RegisterInterface> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleGoBack = () => navigation.goBack()
    const handleSetEmail = async (text: string) => setEmail(text)
    const handleSetPassword = async (text: string) => setPassword(text)
    const handleSetPassword2 = async (text: string) => setPassword2(text)
    const handleRegistration = async () => {
        const regSuccess = await registerWithEmailAndPassword(email, password, password2)
        if (regSuccess) {
            navigation.navigate('News')
        }
        else {
            setPassword('')
            setPassword2('')
        }
    }
    const handleReset = () => {
        setEmail('')
        setPassword('')
        setPassword2('')
    }

    const inputsAreEmpty = email.length === 0 || password.length === 0 || password2.length === 0
    return (
        <View style={styles.root}>
            <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} />
            <TextInput style={styles.textInput} textContentType="emailAddress" onChangeText={handleSetEmail} value={email} />
            <TextInput style={styles.textInput} textContentType="password" onChangeText={handleSetPassword} value={password} />
            <TextInput style={styles.textInput} textContentType="password" onChangeText={handleSetPassword2} value={password2} />
            <Button accessibilityLabel="Button to Submit email and Passowrd for SignUp" disabled={inputsAreEmpty} title="Sign Me Up!" onPress={handleRegistration}> Sign Me Up</Button>
            <Button accessibilityLabel="Button to reset input values" title="Reset" onPress={handleReset} />
            <Button accessibilityLabel="Button to Cancel Registration" title="Cancel" onPress={handleGoBack} />
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

export default RegisterModal;
