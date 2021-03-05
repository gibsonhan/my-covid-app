import React, { useEffect, useState, useRef } from 'react'
import { Animated, Dimensions, FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, View } from 'react-native'
//components
import Bttn from '../components/common/Bttn'
import EntypoIcon from "react-native-vector-icons/Entypo";
import MyList from './common/MyList';

//helper util
import { convertToArray } from '../util/objToArray';
import { storeData } from '../util/localDataHelper'
import USHEALTH from '../reserve/health/unitedState'
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
        const list = convertToArray(data)
        setHealthList(list)
    }, [data])

    //animation, moves info Tab down
    const handleMoveDown = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        setFullScreen(false)
        Animated.timing(topAnim, {
            toValue: startTop,
            duration: 300,
            useNativeDriver: false, //height animation is not supported by native driver

        }).start();
    };

    //animation, moves info Tab up
    const handleMoveUp = () => {
        setFullScreen(true)
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(topAnim, {
            toValue: endTop,
            duration: 500,
            useNativeDriver: false, //height animation is not supported by native driver
        }).start();
    };

    //Save data to default local
    const handleSaveDefault = async () => {
        try {
            await storeData('state', data)
        }
        catch (error) {
            console.log('failed to store local Data')
        }
    }

    return (
        <Animated.View style={[styles.infoTab, { top: topAnim }]}>
            {!fullScreen &&
                <Bttn
                    title="open"
                    style={{ marginTop: 10 }}
                    height={30}
                    width={60}
                    onPress={handleMoveUp}
                />
            }
            {fullScreen &&
                <Bttn
                    title="save default"
                    style={{ marginTop: 10, marginBottom: 10 }}
                    height={40}
                    width={100}
                    onPress={handleSaveDefault}
                />
            }
            {fullScreen &&
                <Bttn
                    title="Map"
                    icon={<EntypoIcon name="map" size={20} color={'black'} />}
                    style={{ zIndex: 3, position: 'absolute', bottom: 100 }}
                    height={40} width={80}
                    onPress={handleMoveDown}
                />
            }
            {fullScreen &&
                <SafeAreaView style={styles.listContainer}>
                    <MyList data={healthList} />
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height - 160, //full window => size of screen - 160. 160 is the space for search bar
        width: Dimensions.get('window').width,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: '#CCCCCC'
    },
    listContainer: {
        height: Dimensions.get('window').height - 300,
        width: Dimensions.get('window').width,
    },
});

export default InfoTab;
