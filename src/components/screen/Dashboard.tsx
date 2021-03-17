import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//component
import SettingList from '../SettingList'
import SignOut from '../SignOut'
//helper
import { Context } from '../../store/AppContext'
import isObjectEmpty from "../../util/isObjectEmpty";
//alias
import { COUNTRY, STATE, DEFAULT } from '../../reserve/data/data'
import { SIGNOUT } from '../../reserve/data/screenName'

function Dashboard() {
    const { state } = useContext(Context)
    const isDefaultEmpty = isObjectEmpty(state.default)
    const TopTab = createMaterialTopTabNavigator();
    //no default home screen and not signed in
    const noDefault = {
        [COUNTRY]: SettingList,
        [SIGNOUT]: SignOut
    }

    const withDefault = {
        [STATE]: SettingList,
        ...noDefault
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
            <TopTab.Navigator>
                {Object.entries({ //TODO investigate entries
                    ...(isDefaultEmpty ? noDefault : withDefault)
                }).map(([name, component]) => (
                    <TopTab.Screen key={name} name={name} component={component} />
                ))}
            </TopTab.Navigator>
        </SafeAreaView>
    )
}
export default React.memo(Dashboard);