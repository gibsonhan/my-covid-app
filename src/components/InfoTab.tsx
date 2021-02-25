import React, { useEffect, useState, useRef } from 'react'
import { Animated, Button, Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, VirtualizedList } from 'react-native'
import EntypoIcon from "react-native-vector-icons/Entypo";

import Bttn from '../components/common/Bttn'
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
    const [fullScreen, setFullScreen] = useState(false)

    //Current Bottom Nav is 48px + 12px Padding Top = 60. 
    //Not sure why we need an 80px offset to get get above the bottom nav, 
    const startTop = Dimensions.get('window').height - (80 + 40);
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
            <Bttn title="open" onPress={moveUp} height={40} width={80} style={{ marginTop: 10 }} />
            {fullScreen &&
                <Bttn
                    title="Map"
                    icon={<EntypoIcon name="map" size={20} color={'black'} />}
                    style={{ zIndex: 3, position: 'absolute', bottom: 100 }}
                    height={40} width={80}
                    onPress={moveDown}
                />
            }
            {fullScreen &&
                <SafeAreaView style={styles.listContainer}>
                    <FlatList
                        data={DATA}
                        initialNumToRender={4}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            }
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    infoTab: {
        zIndex: 1,
        display: 'flex',
        position: 'absolute',
        //top: Dimensions.get('window').height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height - 160, //full window => size of screen - 160. 160 is the space for search bar
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
