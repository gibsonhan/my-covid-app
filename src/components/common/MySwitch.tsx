import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'

export interface MySwitchInterface {
    index: number,
    title: string,
    value: boolean,
    settingList: Array<{}>,
    setSettingList: React.Dispatch<React.SetStateAction<never[]>>,
    DATA_TABLE: object
}

function MySwitch(props: MySwitchInterface) {
    const { index, title, value, settingList, setSettingList, DATA_TABLE } = props
    const [toggleSwitch, setToggleSwitch] = useState(value)
    const handleToggleSwitch = () => {
        const newObject = {
            ...settingList[index],
            value: !toggleSwitch
        }

        const newList = settingList.map((ele, i) => {
            return i === index
                ? newObject
                : ele
        })
        console.log('what is newList', newList)
        setSettingList(newList)
    }

    useEffect(() => {
        const state = settingList[index].value
        setToggleSwitch(state)
    }, [settingList])

    return <View style={styles.root}>
        <Text>{DATA_TABLE[title]}</Text>
        {props && <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={value ? "yellow" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleSwitch}
            value={toggleSwitch} />}
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