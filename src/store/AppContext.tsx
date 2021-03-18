import React, { useEffect } from 'react'
import { formatISO } from 'date-fns'
//helper
import { getData, storeData } from './localDataHelper'
//reserved words
import { COUNTRY, DEFAULT, STATE, SETTING } from '../reserve/data/data'
import { RESETDEFAULT, SETRESETSTATE, SAVEDEFAULT, SAVECOUNTRY, SAVESETTING, SIGNIN, SIGNOUT } from '../reserve/data/reducer'
import { fetchCovidByCountry } from '../util/fetchCovidData'
const initData = {
    resetState: false,
    idToken: '',
    default: {}, //should not name a variable to default
    country: {},
    state: {},
    setting: {
        default: {},
        country: {},
        state: {}
    }
}

function reducer(state: object, payload: object) {
    const { type, data }: { type: string, data: string } = payload
    switch (type) {
        case SETRESETSTATE:
            return {
                ...state,
                resetState: !state.resetState
            }
        case RESETDEFAULT:
            return {
                ...state,
                default: {},
                setting: {
                    ...state.setting,
                    default: {}
                }
            }
        case SAVEDEFAULT:
            return {
                ...state,
                default: data
            }
        case SAVECOUNTRY:
            return {
                ...state,
                country: data
            }
        case SAVESETTING:
            return {
                ...state,
                setting: data
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
    const RESET_DEFAULT = async () => {
        await dispatch({
            type: RESETDEFAULT,
        })
    }

    const SET_RESET_STATE = async (data: boolean) => {
        await dispatch({
            type: SETRESETSTATE,
            data: data
        })
    }
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

    const SAVE_SETTING = async (data: object) => {
        await dispatch({
            type: SAVESETTING,
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
        SET_RESET_STATE,
        RESET_DEFAULT,
        SAVE_DEFAULT,
        SAVE_COUNTRY,
        SAVE_SETTING,
        SIGN_IN,
        SIGN_OUT
    }

    useEffect(() => {
        //console.log('waht is state.setting', state)
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

    useEffect(() => {
        async function getSettingData() {
            let data = await getData(SETTING)
            if (!data.error) {
                await SAVE_SETTING(data)
            }
        }
        getSettingData()
    }, [])

    return <Context.Provider value={{ state, DISPATCH }}>{children}</Context.Provider>
}

export {
    AppContext,
    Context,
}