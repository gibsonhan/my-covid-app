import React, { useContext, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native";

import SettingList from '../SettingList'
import SignOut from '../SignOut'

import { Context } from '../../store/AppContext'
import { COUNTRY, STATE, ZIP } from '../../reserve/data/data'

function Dashboard() {
    const store = useContext(Context)
    const TopTab = createMaterialTopTabNavigator();
    const { zip, state, idToken } = store.state
    return (
        <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
            <TopTab.Navigator>
                <TopTab.Screen name={COUNTRY} component={SettingList} />
                {!state && <TopTab.Screen name={STATE} component={SettingList} />}
                {!zip && <TopTab.Screen name={ZIP} component={SettingList} />}
                {idToken && <TopTab.Screen name={'Sign Out'} component={SignOut} />}
            </TopTab.Navigator>
        </SafeAreaView>
    )
}
export default Dashboard;