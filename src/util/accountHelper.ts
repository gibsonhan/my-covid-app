//Need to import only firbase 
import * as firebase from "firebase/app"

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
        const code = error.code;
        const message = error.message;
        console.log(code, message)
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
        console.log('error', error)
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
        console.log(error)
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
        console.log(error)
    }
}

export {
    signInWithEmailAndPassword,
    signInWithFacebook,
    signInWithGoogle,
    signInWithTwitter
}