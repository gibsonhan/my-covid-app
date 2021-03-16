import React, { useEffect } from 'react'
import { formatISO } from 'date-fns'
//helper
import { getData, storeData } from './localDataHelper'
//reserved words
import { COUNTRY, DEFAULT, STATE } from '../reserve/data/data'
import { SAVEDEFAULT, SAVECOUNTRY, SIGNIN, SIGNOUT } from '../reserve/data/reducer'
import fetchCovidData, { fetchCovidByCountry } from '../util/fetchCovidData'
const initData = {
    idToken: '',
    default: {}, //should not name a variable to default
    country: {},
    state: {},
    setting: {
        country: {},
        state: {}
    }
}

function reducer(state: object, payload: object) {
    const { type, data }: { type: string, data: string } = payload
    switch (type) {
        case SAVEDEFAULT:
            console.log('reducer', data)
            return {
                ...state,
                default: data
            }
        case SAVECOUNTRY:
            return {
                ...state,
                country: data
            }
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
    const SAVE_COUNTRY = async (data: object) => {
        await dispatch({
            type: SAVECOUNTRY,
            data: data
        })
    }
    const SAVE_DEFAULT = async (data: object) => {
        await dispatch({
            type: SAVEDEFAULT,
            data: data
        })
    }
    const SIGN_IN = async (idToken: string) => {
        await dispatch({
            type: SIGNIN,
            data: idToken
        })
    }

    const SIGN_OUT = async () => {
        await dispatch({
            type: SIGNOUT,
            data: 'None'
        })
    }

    const DISPATCH = {
        SAVE_DEFAULT,
        SAVE_COUNTRY,
        SIGN_IN,
        SIGN_OUT
    }

    useEffect(() => {
        console.log('state', state)
    }, [state])

    //set global contry data
    useEffect(() => {
        async function getGlobalData() {
            let data = await getData(COUNTRY)
            //check local data
            if (data.error) {
                data = await fetchCovidByCountry()
                await storeData(COUNTRY, data)
            }

            //Update Context API
            await SAVE_COUNTRY(data)
        }

        async function getDefaultData() {
            let data = await getData(DEFAULT)
            if (!data.error) {
                await SAVE_DEFAULT(data)
            }
        }
        getGlobalData()
        getDefaultData()
    }, [])

    return <Context.Provider value={{ state, DISPATCH }}>{children}</Context.Provider>
}

export {
    AppContext,
    Context,
}