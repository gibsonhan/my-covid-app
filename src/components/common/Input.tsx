import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

export interface InputInterface {
    placeholder?: string,
    autocorrect?: boolean,
    style?: object,
    onChangeText: (text: string) => void
    value: string
}
function Input(props: InputInterface) {
    const { style } = props
    const inputStyle = style
    return (
        <View style={styles.root}>
            <TextInput
                style={[styles.input, inputStyle]}
                {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'grey'
    },
    input: {
        height: 50,
        width: 200,
        backgroundColor: 'yellow'
    }
})

export default Input