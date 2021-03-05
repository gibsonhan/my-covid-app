import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import SettingList from '../SettingList'

const Dashboard = ({ navigation }: any) => {
    const TopTab = createMaterialTopTabNavigator();
    return (
        <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
            <TopTab.Navigator>
                <TopTab.Screen name="Country" component={SettingList} />
                <TopTab.Screen name="State" component={SettingList} />
            </TopTab.Navigator>
        </SafeAreaView>
    )
}
export default Dashboard;