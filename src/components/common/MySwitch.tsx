import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'

export interface MySwitchInterface {
    index: number,
    title: string,
    isEnabled: boolean,
    settingList: Array<{}>,
    setSettingList: React.Dispatch<React.SetStateAction<never[]>>,
    DATA_TABLE: object
}

function MySwitch(props: MySwitchInterface) {
    const { index, isEnabled, title, settingList, setSettingList, DATA_TABLE } = props
    const [toggleSwitch, setToggleSwitch] = useState(isEnabled)

    const handleToggleSwitch = () => {
        //create new Object with !toggle value
        const newObj = {
            ...settingList[index],
            isEnabled: !toggleSwitch
        }
        setToggleSwitch(props => !props)            //update toggle value
        const newListSetting = settingList    //create new settingList
        newListSetting[index] = newObj           //update specific index

        setSettingList(newListSetting)
    }

    useEffect(() => {
        //TODO need to refactor state to handle reset, and prevent constant refiring
        const currObj = settingList[index]
        const state = currObj.isEnabled
        setToggleSwitch(state)
    }, [settingList])

    return <View style={styles.root}>
        <Text>{DATA_TABLE[title]}</Text>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default MySwitch