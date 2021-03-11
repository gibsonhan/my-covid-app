import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
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
    const [settingList, setSettingList] = useState()

    const handleSaveSetting = async () => {

    }

    const handleResetSettings = async () => {
    }

    useEffect(() => {
        async function createSetting() {
            const listType = name === COUNTRY ? COUNTRY : STATE
            let countrySetting: { [key: string]: boolean } = {}
            const resposne = await getData(listType)
            console.log('waht is response', resposne)
            for (const [key, value] of Object.entries(resposne)) {
                countrySetting[key] = true
            }

            //covert obj to array
            const newList = convertToArray(countrySetting)
            setSettingList(newList)

            const settingObj = { COUNTRY: countrySetting }
            storeData(SETTING, settingObj)
        }

        createSetting()
        //fetchSetting()
    }, [])

    useEffect(() => {
        console.log('what is setting List', settingList)
    }, [settingList])

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
                settingList={settingList}
                setSettingList={setSettingList}
                {...item}
            />
        )
    }
    useEffect(() => {
        console.log('what is setting state', settingList)
    }, [setSettingList])
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

export default SettingList