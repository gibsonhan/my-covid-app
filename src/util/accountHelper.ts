import * as firebase from 'firebase/app'

type registerInputType = {
    email: string,
    password: string,
    password2: string
}
type errorResponse = {
    error: boolean,
    message: string,
}

async function signInWithEmailAndPassword(inputs: signInInputType): Promise<any | errorResponse> {
    const { email, password } = inputs
    const notValidInput = email.length < 5 || password.length < 5;

    if (notValidInput) {
        const errorMessage = {
            'error': true,
            'message': 'Password and Email length must be greater than 5'
        }
        return errorMessage
    }

    const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

    return response
}

type signInInputType = {
    email: string,
    password: string,
}

async function registerWithEmailAndPassword(inputs: registerInputType): Promise<any | errorResponse> {
    const { email, password, password2 } = inputs
    const pass2Match = password === password2;
    const passtoShort = password.length < 5;

    if (!pass2Match) {
        const ErrorMessage = {
            error: true,
            message: 'Password 2 does not Match'
        }
        return ErrorMessage
    }

    if (passtoShort) {
        const ErrorMessage = {
            error: true,
            message: 'Password must be longer 5 characters'
        }
        return ErrorMessage
    }

    const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

    return response
}

export {
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
};