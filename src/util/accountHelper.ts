//Need to import only firbase 
import * as firebase from "firebase/app"

const isAppInit = firebase.apps.length > 0

//TODO check if this actually work. 
async function signInWithEmailAndPassword(email: string, password: string) {
    try {
        if (!isAppInit) throw 'App was not initalized'
        let response = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log('login with email and password', response)
    }
    catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    }
}
function signInWithGoogle() {
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
            console.log(token, typeof token)
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
            //TODO -> handle google styling and 
            //https://developers.google.com/identity/branding-guidelines
        });
}
function signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().languageCode = 'en';
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential?.accessToken;

            // ...
        })
        .catch((error) => {
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

export {
    signInWithEmailAndPassword,
    signInWithFacebook,
    signInWithGoogle
}