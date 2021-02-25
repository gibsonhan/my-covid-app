import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'

export interface CenterIconInterface {
    height: number,
    width: number,
    icon: ReactElement
}

function CenterIcon(props: CenterIconInterface) {
    const { height, width, icon } = props

    if (!height || !width) return <>Loading...</>
    return <View style={[styles.root, { height, width }]}>
        {icon}
    </View>
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CenterIcon