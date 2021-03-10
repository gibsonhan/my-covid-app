import React from 'react'
import { FlatList, StyleSheet, Text, ListRenderItemInfo, View } from 'react-native'
import { COUNTRY, DEPRECRIATED, STATE, ZIP } from '../../reserve/data/data'

import USHEALTH from '../../reserve/health/unitedState'
import STATEHEALTH from '../../reserve/health/state'
import { convertToArray } from '../../util/objToArray'

export interface MyListInterface {
    list?: {},
    listType?: string,
}

function MyList(props: MyListInterface) {
    const { list, listType } = props

    type itemTypes = {
        table: { [key: string]: string }
        title: string,
        value: string,
    }

    const Item = ({ title, value, table }: itemTypes) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{table[title]}</Text>
                <Text >{value}</Text>
            </View>
        );
    };

    const renderItem = ({ item }: ListRenderItemInfo<any>) => {
        const { key, title, value } = item
        const TABLE = listType === COUNTRY ? USHEALTH : STATEHEALTH
        const isInvalid = TABLE[title] === 'depreciated'
        if (isInvalid) return <></>
        return <Item key={key} {...{ title, value }} table={TABLE} />
    }
    return (
        <FlatList
            data={convertToArray(list)}
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