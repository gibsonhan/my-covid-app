import React, { useEffect, useState, useRef } from 'react'
import { Animated, Button, Dimensions, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native'

export interface InfoTabInterface {
    data: {}
}
const InfoTab = (props: InfoTabInterface) => {
    const { data } = props
    const [press, setPress] = useState(0)
    const [fullScreen, setFullScreen] = useState(false)
    const [tabHeight, setTabHeight] = useState(80)
    const heightAnim = useRef(new Animated.Value(80)).current;

    useEffect(() => {
        console.log('what is data', data)
    }, [props])

    const moveUp = () => {
        setPress(props => props + 1)
        setFullScreen(true)
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(heightAnim, {
            toValue: Dimensions.get('window').height,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const moveDown = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(heightAnim, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.infoTab, { height: heightAnim }]}>
            <Pressable
                onPressOut={moveUp}
                style={styles.press}
            >
                <Text style={styles.tabContent}>{press}</Text>
                {fullScreen && <Text style={styles.tabContent}>Hello</Text>}
                {fullScreen && <Text style={styles.tabContent}>Hello</Text>}
                {fullScreen && <Button title="close" onPress={moveDown} />}
            </Pressable>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    infoTab: {
        flex: 1,
        backgroundColor: 'green',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        position: 'absolute',
        bottom: 0,
    },
    press: {
        zIndex: 2,
        height: 60,
        backgroundColor: 'red'
    },
    tabContent: {
        height: 100,
        marginBottom: 20,
    }
});

export default InfoTab;
