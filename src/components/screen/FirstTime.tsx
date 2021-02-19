import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import OctIcon from 'react-native-vector-icons/Octicons'

import Map from '../Map'
import fetchCovidData from '../../util/fetchCovidData';
import initGeoPos from '../../reserve/map/initGeoPos'

const FirstTime: React.FC<{}> = (props) => {
  const [data, setData] = useState({});
  const [geoPosition, setGeoPosition] = useState(initGeoPos)
  const [search, setSearchInput] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetchCovidData(search);
      const { latitude, longitude } = response
      const newGeoPosition = {
        latitude,
        longitude,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }
      setGeoPosition(newGeoPosition)
      setData(response)
    }
    catch (err) {
      console.log(err)
    }
  };

  const setText = (text: string) => {
    setSearchInput(text.toLowerCase());
  }

  return (
    <View style={styles.root}>
      <Map geoPosition={geoPosition} />
      <View style={styles.search}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter State or Zip Code"
          onChangeText={setText}
          value={search}
        />
        <OctIcon name="search" />
        <Button title="Search" onPress={fetchData} />
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  search: {
    position: 'absolute',
    top: 100,
    zIndex: 1,
    flexDirection: "column",
    justifyContent: 'center'
  },
});

export default FirstTime;
