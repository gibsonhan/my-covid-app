import React, { useEffect, useState, useRef } from 'react'
import { Animated, Button, Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, VirtualizedList } from 'react-native'

export interface InfoTabInterface {
    data: {}
}

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acb1ea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: 'h1',
        title: 'hello'
    }
];

const InfoTab = (props: InfoTabInterface) => {
    const { data } = props
    const [press, setPress] = useState(0)
    const [fullScreen, setFullScreen] = useState(false)
    const [tabHeight, setTabHeight] = useState(80)

    const startTop = Dimensions.get('window').height - 140
    const endTop = 160;
    const topAnim = useRef(new Animated.Value(startTop)).current;

    useEffect(() => {
        let w = Dimensions.get('window').width
        let h = Dimensions.get('window').height

        let w2 = Dimensions.get('screen').width
        let h2 = Dimensions.get('screen').height

        console.log(w, h)
        console.log(w2, h2)
    }, [data])

    const moveUp = () => {
        setPress(props => props + 1)
        setFullScreen(true)
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(topAnim, {
            toValue: endTop,
            duration: 500,
            useNativeDriver: false, //height animation is not supported by native driver
        }).start();
    };

    const moveDown = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(topAnim, {
            toValue: startTop,
            duration: 300,
            useNativeDriver: false, //height animation is not supported by native driver

        }).start();
    };

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );


    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <Animated.View style={[styles.infoTab, { top: topAnim }]}>
            <Pressable
                onPressOut={moveUp}
                style={styles.press}
            >
                <Text style={styles.tabContent}>{press}</Text>
            </Pressable>
            {fullScreen && <View style={{ padding: 10 }}><Button title="close" onPress={moveDown} /></View>}
            {fullScreen && <SafeAreaView style={styles.listContainer}>
                <FlatList
                    data={DATA}
                    initialNumToRender={4}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>}
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    infoTab: {
        zIndex: 1,
        display: 'flex',
        position: 'absolute',
        top: Dimensions.get('window').height - 140,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height - 226,
        width: Dimensions.get('window').width,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: 'gray'
    },
    press: {
        display: 'flex',
        alignItems: 'center',
        zIndex: 2,
        height: 60,
        width: Dimensions.get('window').width,
        paddingTop: 10,
    },
    tabContent: {
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
    },
    listContainer: {
        height: Dimensions.get('window').height - 326,
        width: Dimensions.get('window').width,
    },
    item: {
        zIndex: 3,
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
        borderRadius: 20,
    },
});

export default InfoTab;
