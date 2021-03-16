import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from '@react-navigation/native'

//component
import SettingList from '../SettingList'
import SignOut from '../SignOut'
//helper
import { Context } from '../../store/AppContext'
import { getData } from "../../store/localDataHelper";
import { COUNTRY, STATE, DEFAULT } from '../../reserve/data/data'
import { SIGNOUT } from '../../reserve/data/screenName'

function Dashboard() {
    const { state } = useContext(Context)
    const isFocused = useIsFocused()
    const TopTab = createMaterialTopTabNavigator();
    const [hasDefault, setHasDefault] = useState(false)

    useEffect(() => {
        //check local, and context api for default.
        //if there isn't default. Do nothing.
        async function checkDefault() {
            //check context api for default first
            if (state.default.length > 0) {
                setHasDefault(true)
            }
            else {
                let response = await getData(DEFAULT)
                if (!response.error) setHasDefault(true)
            }
        }
        checkDefault()
    }, [isFocused])

    //no default home screen and not signed in
    if (!hasDefault) {
        return (
            <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
                <TopTab.Navigator>
                    <TopTab.Screen name={STATE} component={SettingList} />
                    <TopTab.Screen name={COUNTRY} component={SettingList} />
                    <TopTab.Screen name={SIGNOUT} component={SignOut} />
                </TopTab.Navigator>
            </SafeAreaView>
        )
    }
    //default setting screen, when default there is no default
    return (
        <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
            <TopTab.Navigator>
                <TopTab.Screen name={COUNTRY} component={SettingList} />
                <TopTab.Screen name={SIGNOUT} component={SignOut} />
            </TopTab.Navigator>
        </SafeAreaView>
    )
}
export default Dashboard;