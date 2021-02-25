import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export interface geoPositionInterface {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

const Map: React.FunctionComponent<{ geoPosition: geoPositionInterface }> = ({ geoPosition }) => {
    if (!geoPosition) return <>Loading... </>
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{ ...geoPosition }}
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
