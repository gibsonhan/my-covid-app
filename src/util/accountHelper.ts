//Need to import only firbase 
import * as firebase from "firebase/app"
import Toast from 'react-native-toast-message';

function ToastMessage(type: string) {
    return Toast.show({
        type: 'error',
        position: 'top',
        text1: `Fail to Login in with ${type}`,
        text2: 'Please try again  👋 ',
        visibilityTime: 3000,
        topOffset: 30,
    })
}
const isAppInit = firebase.apps.length > 0

//TODO check if this actually work. 
async function signInWithEmailAndPassword(email: string, password: string) {
    const inputIsValid = email.length > 5 && password.length > 5
    try {
        //TODO figure out where does firebaseConfig should live and where it should be initalized
        //if (!isAppInit) throw 'App was not initalized'
        if (!inputIsValid) throw { code: 'none', message: 'Email or Password Input is invalid' }
        let response = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log('login with email and password', response)
    }
    catch (error) {
        ToastMessage('Email and Password')
    }
}
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        firebase.auth().languageCode = 'en';
        const response = await firebase.auth().signInWithPopup(provider)
        const { isNewUser }: boolean = response.additionalUserInfo
    }
    catch (error) {
        ToastMessage('Google')
        //TODO -> handle google styling and 
        //https://developers.google.com/identity/branding-guidelines
    }
}
async function signInWithFacebook() {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        firebase.auth().languageCode = 'en';
        const response = await firebase.auth().signInWithPopup(provider)
        console.log('what is response', response)
    }
    catch (error) {
        ToastMessage('Facebook')
    }
}

async function signInWithTwitter() {
    try {
        const provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().languageCode = 'en';
        const response = await firebase.auth().signInWithPopup(provider)
        console.log('what is response', response)
    }
    catch (error) {
        ToastMessage('Twitter')
    }
}

async function registerWithEmailAndPassword(email: string, password: string, password2: string) {
    const isEqual = password === password2
    const isLongerThan6 = password.length > 5

    try {
        if (!isEqual || !isLongerThan6) throw 'Something Went Wrong'
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
        return true
    }
    catch (error) {
        console.log(error)
        Toast.show({
            type: 'error',
            position: 'top',
            text1: `Fail to Register. Password Inputs Must Match and Must Be Greater than 6 letters`,
            text2: 'Please try again  👋 ',
            visibilityTime: 3000,
            topOffset: 30,
        })
    }

    return false
}

export {
    registerWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithFacebook,
    signInWithGoogle,
    signInWithTwitter
}