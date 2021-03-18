import React, { ReactElement } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
export interface ButtonInterface {
    title?: string,
    icon?: ReactElement,
    onPress: () => void,
    height?: number,
    width?: number,
    backgroundColor?: string,
    borderRadius?: number,
    style?: object,
}

function Bttn(props: ButtonInterface) {
    const { icon, title, height, width, style, onPress } = props
    if (icon) {
        return (
            <TouchableOpacity
                style={[
                    styles.root,
                    { width, height }, //Not sure if having w&h as own props is redudant to having a style props
                    style
                ]}
                onPress={onPress}
            >
                <View style={styles.container}>
                    {icon}
                    <Text style={styles.iconText}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity
            style={[styles.root, { width, height }, style]}
            onPress={onPress}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', //Justify content center on the oppsosite of main axis
        backgroundColor: '#FFFB24',
        borderRadius: 25,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        paddingLeft: 5,
    }
})

export default Bttn