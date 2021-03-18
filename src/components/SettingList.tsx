import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
//component
import Bttn from '../components/common/Bttn'
import MySwitch from '../components/common/MySwitch'
//helper util
import { Context } from '../store/AppContext'
import { getData, storeData } from '../store/localDataHelper'
import { convertToArray } from '../util/objToArray'
import isObjectEmpty from '../util/isObjectEmpty'
//Data
import { COUNTRY, DEFAULT, SETTING, STATE } from '../reserve/data/data'
import US_HEATH_TABLE from '../reserve/health/unitedState'
import STATE_HEALTH_TABLE from '../reserve/health/state.js'

function SettingList(props) {
    const { route } = props
    const { name } = route
    const { state, DISPATCH } = useContext(Context)
    const [reset, setReset] = useState(false)
    const [settingList, setSettingList] = useState([])
    const settingType = name === COUNTRY ? COUNTRY : DEFAULT

    async function createNewSetting() {
        let setting: { [key: string]: string } = {}
        let data = state[settingType]
        const isEmpty = isObjectEmpty(data)
        //if data empty force retrieve from local storage
        if (isEmpty) {
            data = await getData(settingType)
        }

        for (const [key] of Object.entries(data)) {
            setting[key] = 'true'
        }

        const newList = convertToArray(setting)
        setSettingList(newList)

        const currSetting = { [settingType]: setting }
        const localSetting = await getData(SETTING)
        const finalSetting = !localSetting.error
            ? { ...localSetting, ...currSetting }
            : currSetting
        storeData(SETTING, finalSetting)
    }

    const handleSaveSetting = async () => {
        const { SAVE_SETTING } = DISPATCH
        const saveSetting = settingList.reduce((acc, curr) => {
            const { title, value } = curr
            acc[title] = value
            return acc
        }, {})
        try {
            const setting = await getData(SETTING)
            const newSetting = { [settingType]: saveSetting }
            const combineSetting = { ...setting, ...newSetting }
            await SAVE_SETTING(combineSetting)
            await storeData(SETTING, combineSetting)
        }
        catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Failed to save',
                text2: 'Please try again  👋 ',
                visibilityTime: 3000,
                topOffset: 100
            });
        }
    }

    const handleResetSettings = async () => {
        setReset(true)
        createNewSetting()

        //toogle reset after the function end
        setTimeout(() => {
            setReset(false)
        }, 0)
    }

    //setting configuration
    useEffect(() => {
        async function fetchSetting() {
            //CHECK context API for settings -> onload context API should check local
            const setting = state.setting[settingType]
            const isEmpty = isObjectEmpty(setting)
            if (!isEmpty) {
                const newSetting = convertToArray(setting)
                setSettingList(newSetting)
            }
            else {
                createNewSetting()
            }
        }
        fetchSetting()
    }, [])

    const renderItem = (props) => {
        const { index, item } = props
        const { title, value } = item
        const convertValue = value === 'true' ? true : false
        const TABLE = name === COUNTRY ? US_HEATH_TABLE : STATE_HEALTH_TABLE
        if (TABLE[title] === 'depreciated') return <></>
        return (
            <MySwitch
                index={index}
                key={item.key}
                title={title}
                reset={reset}
                value={convertValue}
                DATA_TABLE={TABLE}
                settingList={settingList}
                setSettingList={setSettingList}
            />
        )
    }

    if (!settingList) return <Text>Loading...</Text>
    return (
        <View style={styles.root}>
            <FlatList
                data={settingList}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
            <View style={styles.buttonContainer}>
                <Bttn title="save setting" height={60} width={120} onPress={handleSaveSetting} style={{ marginRight: 10 }} />
                <Bttn title="reset setting" height={60} width={120} onPress={handleResetSettings} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
});

export default SettingList