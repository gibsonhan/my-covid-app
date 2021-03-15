import React, { useContext, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native";

import { Context } from '../../store/AppContext'
import SettingList from '../SettingList'
import SignOut from '../SignOut'

import { SIGNOUT } from '../../reserve/data/screenName'
import { COUNTRY, STATE, DEFAULT } from '../../reserve/data/data'
import { getData } from "../../store/localDataHelper";

function Dashboard() {
    const store = useContext(Context)
    const { idToken } = store
    const TopTab = createMaterialTopTabNavigator();
    const [hasDefault, setHasDefault] = useState(false)

    useEffect(() => {
        async function checkDefault() {
            let response = await getData(DEFAULT)
            if (!response.error) setHasDefault(true)
            console.log(hasDefault)
        }
        checkDefault()
    }, [])

    if (!hasDefault && !idToken) {
        return (
            <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
                <TopTab.Navigator>
                    <TopTab.Screen name={COUNTRY} component={SettingList} />
                    <TopTab.Screen name={SIGNOUT} component={SignOut} />
                </TopTab.Navigator>
            </SafeAreaView>
        )
    }
    if (hasDefault && !idToken) {
        return (
            <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
                <TopTab.Navigator>
                    <TopTab.Screen name={STATE} component={SettingList} />
                    <TopTab.Screen name={SIGNOUT} component={SignOut} />
                </TopTab.Navigator>
            </SafeAreaView>
        )
    }
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
export default Dashboard;