import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Switch, Text, View } from 'react-native'

export interface MySwitchInterface {
    index: number,
    title: string,
    value: boolean,
    settingList: Array<{}>,
    setSettingList: React.Dispatch<React.SetStateAction<never[]>>,
    DATA_TABLE: object
}

function MySwitch(props: MySwitchInterface) {
    const { index, title, value, reset, settingList, setSettingList, DATA_TABLE } = props
    const [isEnabled, setIsEnabled] = useState(false)
    const handleToggleSwitch = () => {
        setIsEnabled(prop => !prop)
        const newObject = {
            ...settingList[index],
            value: isEnabled
        }
        const newList = settingList.map((ele, i) => {
            return i === index
                ? newObject
                : ele
        })
        setSettingList(newList)
    }

    useEffect(() => {
        if (reset) setIsEnabled(false)
    }, [reset])

    return <View style={styles.root}>
        <Text>{DATA_TABLE[title]}</Text>
        {props && <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={value ? "yellow" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleSwitch}
            value={isEnabled} />}
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

export default React.memo(MySwitch)