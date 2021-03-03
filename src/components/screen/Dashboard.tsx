import React, { useContext, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Switch, Text, View } from "react-native";

import { Context } from '../../store/AppContext'
import firebase from '../../util/firebaseHelper'
import Toast from 'react-native-toast-message'
import { getData } from "../../util/localDataHelper"
import { convertToArray } from '../../util/objToArray'
import Bttn from "../../components/common/Bttn";
//AVI
const Dashboard = ({ navigation }: any) => {
    const store = useContext(Context)
    const { SIGN_OUT } = store.DISPATCH

    const [countrySetting, setCountrySetting] = useState([])
    const handleSaveSetting = () => {
        console.log('hello')
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
            setCountrySetting(() => globalListSetting)
        }
        getLocalList()
    }, [])

    const renderItem = ({ item }) => {
        console.log('what is props', item)
        return <MySwitch key={item.key} {...item} />
    }

    return (
        <View style={styles.root}>
            <Text>Dashboard</Text>
            <FlatList
                data={countrySetting}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
            <Bttn title="save settings" onPress={handleSaveSetting} />
            <Button title="sign out" onPress={handleSignOut} />
        </View>
    );
};

export interface MySwitchInterface {
    title: string,
    isEnabled: boolean,
}

function MySwitch(props: MySwitchInterface) {
    const [toggleSwitch, setToggleSwitch] = useState(false)
    const { title, isEnabled } = props
    console.log('what is props', props)
    return <View style={styles.switchRoot}>
        <Text>{title}</Text>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            //onValueChange={toggleSwitch}
            value={isEnabled} />
    </View>
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchRoot: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default Dashboard;