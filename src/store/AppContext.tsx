import React, { useEffect } from 'react'
const initData = {
    idToken: '',
    default: '',
    country: {},
    state: {},
    zip: {},
    searchHistory: {
        date: '',
        query: '',
    }
}

function reducer(state: object, payload: object) {
    const { type, data }: { type: string, data: string } = payload
    switch (type) {
        case 'Sign In':
            return {
                ...state,
                idToken: data
            }
        case 'Sign Out':
            return initData
        default: throw Error()
    }
}

const Context = React.createContext(null)
const AppContext: React.FC<{}> = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initData)
    //data handler

    //account handlers
    const SIGN_IN = async (idToken: string) => {
        console.log('sign in')
        await dispatch({
            type: 'Sign In',
            data: idToken
        })
    }

    const SIGN_OUT = async () => {
        console.log('sign out')
        await dispatch({
            type: 'Sign Out',
            data: 'None'
        })
    }

    const DISPATCH = {
        SIGN_IN,
        SIGN_OUT
    }

    useEffect(() => {
        console.log('state', state)
    }, [state])

    return <Context.Provider value={{ state, DISPATCH }}>{children}</Context.Provider>
}

export {
    AppContext,
    Context,
}