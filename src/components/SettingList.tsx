import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
//component
import Bttn from '../components/common/Bttn'
import MySwitch from '../components/common/MySwitch'
//helper util
import { convertToArray } from '../util/objToArray'
import { getData, storeData } from "../util/localDataHelper"
//Data
import { COUNTRY, COUNTRY_SETTING, DEPRECATED, STATE, STATE_SETTING } from '../reserve/data/data'
import US_HEATH_TABLE from '../reserve/health/unitedState'
import STATE_HEALTH_TABLE from '../reserve/health/state.js'

function SettingList({ route }: any) {
    const { name } = route
    const [settingList, setSettingList] = useState([])

    const handleSaveSetting = async () => {
        name === 'Country'
            ? await storeData(COUNTRY_SETTING, settingList)
            : await storeData(STATE_SETTING, settingList)
    }

    const handleResetSettings = async () => {
        const resposne = await getData(COUNTRY)
        const globalListSetting = convertToArray(resposne)

        //append isEnable: boolean into arrary w/ type object
        const newSettingList = globalListSetting.map(ele => {
            return { ...ele, isEnabled: true }
        })
        setSettingList(props => newSettingList)
        await storeData(COUNTRY_SETTING, newSettingList)
    }

    useEffect(() => {
        async function getLocalList() {
            const resposne = await getData('US')
            const globalListSetting = convertToArray(resposne)

            //append isEnable: boolean into arrary w/ type object
            const newCountrySetting = globalListSetting.map(ele => {
                return { ...ele, isEnabled: true }
            })

            setSettingList(newCountrySetting)
        }

        async function getCountrySetting() {
            const response = await getData('COUNTRY_SETTING')
            setSettingList(response)
        }

        async function fetchStateData() {
            const response = await getData('state')
            const stateListSetting = convertToArray(response)

            const newStateListSetting = stateListSetting.map(ele => {
                return { ...ele, isEnabled: true }
            })

            setSettingList(newStateListSetting)
        }


        getLocalList()
        if (name === 'Country') {
            getCountrySetting()
            fetchStateData()
        }
    }, [])

    const renderItem = (props) => {
        const { index, item } = props
        const { title } = item
        const TABLE = name === 'Country' ? US_HEATH_TABLE : STATE_HEALTH_TABLE
        if (TABLE[title] === undefined || TABLE[title] === DEPRECATED) return <></>
        return (
            <MySwitch
                key={item.key}
                index={index}
                {...item}
                settingList={settingList}
                setSettingList={setSettingList}
                DATA_TABLE={TABLE}
            />
        )
    }
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