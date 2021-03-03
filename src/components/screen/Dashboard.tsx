import React, { useContext, useEffect, useState } from "react";
import { Button, Dimensions, FlatList, SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import Toast from 'react-native-toast-message'
//component
import Bttn from "../../components/common/Bttn"
//helper funtil
import { Context } from '../../store/AppContext'
import { convertToArray } from '../../util/objToArray'
import firebase from '../../util/firebaseHelper'
import { getData, storeData } from "../../util/localDataHelper"
import US_HEATH_TABLE from '../../reserve/health/unitedState'

const Dashboard = ({ navigation }: any) => {
    const store = useContext(Context)
    const { SIGN_OUT } = store.DISPATCH

    const [countrySetting, setCountrySetting] = useState([])

    const handleSaveSetting = async () => {
        await storeData('COUNTRY_SETTING', countrySetting)
    }

    const handleResetSettings = async () => {
        const resposne = await getData('US')
        const globalListSetting = convertToArray(resposne)

        //append isEnable: boolean into arrary w/ type object
        const newCountryListSetting = globalListSetting.map(ele => {
            return { ...ele, isEnabled: true }
        })
        setCountrySetting(props => newCountryListSetting)
        await storeData('COUNTRY_SETTING', newCountryListSetting)
    }

    const handleSignOut = async () => {
        try {
            let response = await firebase.auth().signOut()
            console.log('what is the response', response)
            SIGN_OUT()
            navigation.navigate('Feedback')
        }
        catch {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: `Failed To Log Out`,
                text2: 'Please try again  👋 ',
                visibilityTime: 3000,
                topOffset: 30,
            })
        }
    }

    //Fetch Local data of Country
    useEffect(() => {
        async function getLocalList() {
            const resposne = await getData('US')
            const globalListSetting = convertToArray(resposne)

            //append isEnable: boolean into arrary w/ type object
            const newCountryListSetting = globalListSetting.map(ele => {
                return { ...ele, isEnabled: true }
            })

            setCountrySetting(newCountryListSetting)
        }

        async function getCountrySetting() {
            const response = await getData('COUNTRY_SETTING')
            setCountrySetting(response)
        }

        getLocalList()
        getCountrySetting()
    }, [])

    const renderItem = (props) => {
        const { index, item } = props
        return <MySwitch key={item.key} index={index} {...item} countrySetting={countrySetting} setCountrySetting={setCountrySetting} />
    }

    return (
        <SafeAreaView style={styles.root}>
            <FlatList
                data={countrySetting}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
            <View style={styles.settingButton__container}>
                <Bttn title="save setting" height={60} width={120} onPress={handleSaveSetting} />
                <Bttn title="reset setting" height={60} width={120} onPress={handleResetSettings} />
            </View>
            <Button title="sign out" onPress={handleSignOut} />
        </SafeAreaView>
    );
};

export interface MySwitchInterface {
    index: number,
    title: string,
    isEnabled: boolean,
    countrySetting: Array<{}>,
    setCountrySetting: React.Dispatch<React.SetStateAction<never[]>>
}

function MySwitch(props: MySwitchInterface) {
    const { index, isEnabled, title, countrySetting, setCountrySetting } = props
    const [toggleSwitch, setToggleSwitch] = useState(isEnabled)

    const handleToggleSwitch = () => {
        //create new Object with !toggle value
        const newObj = {
            ...countrySetting[index],
            isEnabled: !toggleSwitch
        }
        setToggleSwitch(props => !props)            //update toggle value
        const newCountrySetting = countrySetting    //create new countrySetting
        newCountrySetting[index] = newObj           //update specific index

        setCountrySetting(newCountrySetting)
    }

    useEffect(() => {
        //TODO need to refactor state to handle reset, and prevent constant refiring
        const currObj = countrySetting[index]
        const state = currObj.isEnabled
        setToggleSwitch(state)
    }, [countrySetting])

    //handles depreciated data
    if (US_HEATH_TABLE[title] === null) return <></>
    return <View style={styles.switchRoot}>
        <Text>{US_HEATH_TABLE[title]}</Text>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={toggleSwitch ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleSwitch}
            value={toggleSwitch} />
    </View>
}

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 40,
    },
    settingButton__container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    switchRoot: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default Dashboard;