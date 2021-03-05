import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, ListRenderItemInfo, View } from 'react-native'

import USHEALTH from '../../reserve/health/unitedState'

export interface MyListInterface {
    data?: Array<{}>,
}

function MyList(props: MyListInterface) {
    const { data } = props
    type itemTypes = {
        title: string,
        value: string,
    }

    const Item = ({ title, value }: itemTypes) => {
        //const notHaveTitle = !USHEALTH[title] || USHEALTH[title] === null || USHEALTH[title] === 'null'
        //if (notHaveTitle || value === 'null') return <></>
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{USHEALTH[title]}</Text>
                <Text >{value}</Text>
            </View>
        );
    };

    const renderItem = ({ item }: ListRenderItemInfo<any>) => (
        <Item key={item.key} title={item.title} value={item.value} />
    );
    return (
        <FlatList
            data={data}
            initialNumToRender={4}
            renderItem={(ele) => renderItem(ele)}
            keyExtractor={item => item.key}
        />
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
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


export default MyList