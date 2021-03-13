import React, { useContext, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native";

import SettingList from '../SettingList'
import SignOut from '../SignOut'

import { Context } from '../../store/AppContext'
import { COUNTRY, STATE, DEFAULT } from '../../reserve/data/data'
import { getData } from "../../store/localDataHelper";

function Dashboard() {
    const store = useContext(Context)
    const TopTab = createMaterialTopTabNavigator();
    const [hasDefault, setHasDefault] = useState(false)
    const { idToken } = store.state

    useEffect(() => {
        async function checkDefault() {
            let response = await getData(DEFAULT)
            if (!response.error) setHasDefault(true)
            console.log(hasDefault)
        }
        checkDefault()
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
            <TopTab.Navigator>
                {hasDefault && <TopTab.Screen name={STATE} component={SettingList} />}
                <TopTab.Screen name={COUNTRY} component={SettingList} />
                {idToken && <TopTab.Screen name={'Sign Out'} component={SignOut} />}
            </TopTab.Navigator>
        </SafeAreaView>
    )
}
export default Dashboard;