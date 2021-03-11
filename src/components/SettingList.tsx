import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

//component
import Bttn from '../components/common/Bttn'
import MySwitch from '../components/common/MySwitch'
//helper util
import { convertToArray } from '../util/objToArray'
import { getData, storeData } from '../store/localDataHelper'
//Data
import { COUNTRY, SETTING, STATE, ZIP } from '../reserve/data/data'
import US_HEATH_TABLE from '../reserve/health/unitedState'
import STATE_HEALTH_TABLE from '../reserve/health/state.js'

function SettingList({ route }: any) {
    const { name } = route
    const [reset, setReset] = useState(false)
    const [settingList, setSettingList] = useState([])
    const settingType = name === COUNTRY ? COUNTRY : STATE

    async function checkForLocalSetting() {
        try {
            const response = await getData(SETTING)
            if (response.error) throw response
            const localSetting = response[settingType]
            const newSetting = convertToArray(localSetting)
            console.log('check', newSetting)
            setSettingList(newSetting)
        } catch (error) {
            console.log(error.message)
            return false
        }
        return true
    }
    async function createNewSetting() {
        console.log('am i firring')
        let setting: { [key: string]: boolean } = {}
        const resposne = await getData(settingType)

        for (const [key, value] of Object.entries(resposne)) {
            setting[key] = true
        }

        //covert obj to array because renderItem takes []
        const newList = convertToArray(setting)
        setSettingList(newList)

        const settingObj = { [settingType]: setting }
        storeData(SETTING, settingObj)
    }

    const handleSaveSetting = async () => {
        if (settingList.length === 0) return
        //extact setting values from settingList and save
        console.log('what is settingList', settingList)
        const saveSetting = settingList.reduce((acc, curr) => {
            const { title, value } = curr
            acc[title] = value
            return acc
        }, {})

        try {
            const newSetting = { [settingType]: saveSetting }
            await storeData(SETTING, newSetting)
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
            const haslocalSetting = await checkForLocalSetting()
            if (!haslocalSetting) {
                createNewSetting()
            }
        }
        fetchSetting()
    }, [])

    const renderItem = (props) => {
        const { index, item } = props
        const { title } = item
        const TABLE = name === COUNTRY ? US_HEATH_TABLE : STATE_HEALTH_TABLE
        if (TABLE[title] === 'depreciated') return <></>
        return (
            <MySwitch
                index={index}
                key={item.key}
                DATA_TABLE={TABLE}
                reset={reset}
                settingList={settingList}
                setSettingList={setSettingList}
                {...item}
            />
        )
    }

    if (!settingList) return <Text>Loading...</Text>
    return (
        <View style={styles.root}>
            {true && <FlatList
                data={settingList}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />}
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

export default React.memo(SettingList)