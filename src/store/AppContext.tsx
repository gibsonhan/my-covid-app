import React, { useEffect } from 'react'
import { SAVEDEFAULT, SIGNIN, SIGNOUT } from '../reserve/data/reducer'
const initData = {
    idToken: '',
    default: '',
    setting: {
        country: {},
        state: {}
    }
}

function reducer(state: object, payload: object) {
    const { type, data }: { type: string, data: string } = payload
    switch (type) {
        case SIGNIN:
            return {
                ...state,
                idToken: data
            }
        case SIGNOUT:
            return initData
        default: throw Error()
    }
}

const Context = React.createContext(null)
const AppContext: React.FC<{}> = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initData)
    //account handlers
    const SAVE_DEFAULT = async (state: string) => {
        await dispatch({
            type: SAVEDEFAULT,
            data: state
        })
    }
    const SIGN_IN = async (idToken: string) => {
        await dispatch({
            type: SIGNIN,
            data: idToken
        })
    }

    const SIGN_OUT = async () => {
        console.log('lol are we signing out')
        await dispatch({
            type: SIGNOUT,
            data: 'None'
        })
    }

    const DISPATCH = {
        SAVE_DEFAULT,
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