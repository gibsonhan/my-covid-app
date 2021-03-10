import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export interface MapInterface {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

function Map(props: MapInterface) {

    if (!props) return <>Loading... </>
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{ ...props }}
            >
            </MapView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        zIndex: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

});

export default Map;
