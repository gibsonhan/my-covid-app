import React, { useEffect, useState, useRef } from 'react'
import { Animated, Button, Dimensions, FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import EntypoIcon from "react-native-vector-icons/Entypo";
import USHEALTH from '../reserve/health/unitedState'
import Bttn from '../components/common/Bttn'
export interface InfoTabInterface {
    data: {}
}

const InfoTab = (props: InfoTabInterface) => {
    const { data } = props
    const [healthList, setHealthList] = useState()
    const [fullScreen, setFullScreen] = useState(false)

    //Current Bottom Nav is 48px + 12px Padding Top = 60. 
    //Not sure why we need an 80px offset to get get above the bottom nav, 
    const startTop = Dimensions.get('window').height - (80 + 40);
    const endTop = 160;
    const topAnim = useRef(new Animated.Value(startTop)).current;

    //convert obj data into Array
    useEffect(() => {
        type listType = {
            key: string,
            title: string,
            value: string
        }
        let list: Array<listType> = []

        for (const [key, value] of Object.entries(data)) {
            let newObj = { key: list.length + `${key}`, title: `${key}`, value: `${value}` }
            list = [...list, newObj]
        }

        setHealthList(list)
    }, [data])

    //animation, moves info Tab up
    const moveUp = () => {
        setFullScreen(true)
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(topAnim, {
            toValue: endTop,
            duration: 500,
            useNativeDriver: false, //height animation is not supported by native driver
        }).start();
    };

    //animation, moves info Tab down
    const moveDown = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(topAnim, {
            toValue: startTop,
            duration: 300,
            useNativeDriver: false, //height animation is not supported by native driver

        }).start();
    };

    type itemTypes = {
        title: string,
        value: string,
    }
    const Item = ({ title, value }: itemTypes) => {
        const notHaveTitle = !USHEALTH[title] || USHEALTH[title] === null || USHEALTH[title] === 'null'
        if (notHaveTitle || value === 'null') return <></>
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{USHEALTH[title]}</Text>
                <Text >{value}</Text>
            </View>
        );
    };

    const renderItem = ({ item }: ListRenderItemInfo<any>) => (
        <Item title={item.title} value={item.value} />
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
                        data={healthList}
                        initialNumToRender={4}
                        renderItem={(ele) => renderItem(ele)}
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
        fontSize: 20,
    },
    listContainer: {
        height: Dimensions.get('window').height - 326,
        width: Dimensions.get('window').width,
    },
    item: {
        zIndex: 3,
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#f9c2ff',
        height: 150,

        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
        borderRadius: 20,
    },
});

export default InfoTab;
