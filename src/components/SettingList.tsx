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
import { COUNTRY, DEFAULT, SETTING, STATE, ZIP } from '../reserve/data/data'
import US_HEATH_TABLE from '../reserve/health/unitedState'
import STATE_HEALTH_TABLE from '../reserve/health/state.js'

function SettingList({ route }: any) {
    const { name } = route
    const [reset, setReset] = useState(false)
    const [settingList, setSettingList] = useState([])
    const settingType = name === COUNTRY ? COUNTRY : STATE

    async function createNewSetting() {
        //TODO MIGRATE SAVING DATA TO the store layer
        let setting: { [key: string]: string } = {}

        const resposne = await getData(settingType)
        for (const [key, value] of Object.entries(resposne)) {
            setting[key] = 'true'
        }

        //covert obj to array because renderItem takes []
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
        const saveSetting = settingList.reduce((acc, curr) => {
            const { title, value } = curr
            acc[title] = value
            return acc
        }, {})

        try {
            const setting = await getData(SETTING)
            const newSetting = { [settingType]: saveSetting }
            const combineSetting = { ...setting, ...newSetting }
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
        //TODO THERE IS A warning for the future. SignIn directs to MAP screen. 
        //Setting have a data dependency w/ map screen. If the map screen isnt loaded then setting will ahve issue createing new settings
        async function fetchSetting() {
            try {
                //check if there exist local version save
                const response = await getData(SETTING)
                if (response.error) throw { message: 'no local setting found' }
                const localSetting = response[settingType]
                const newSetting = convertToArray(localSetting)
                setSettingList(newSetting)
            } catch (error) {
                //if not create a new copy
                console.log(error.message)
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
            {<FlatList
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