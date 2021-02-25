import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Map from '../Map'
import InfoTab from '../InfoTab'

import fetchCovidData from '../../util/fetchCovidData';
import initGeoPos from '../../reserve/map/initGeoPos';
import SearchInput from '../../SearchInput'

function FirstTime() {
  const [data, setData] = useState({});
  const [geoPosition, setGeoPosition] = useState(initGeoPos)
  const [search, setSearchInput] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetchCovidData(search);
      if (response.error) throw response;

      const { latitude, longitude } = response
      const newGeoPosition = {
        latitude,
        longitude,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }

      setGeoPosition(newGeoPosition)
      setData(() => response)
    }
    catch (err) {
      console.log('err', err)
      setGeoPosition(initGeoPos)
    }
  };

  const setText = (text: string) => {
    setSearchInput(text.toLowerCase());
  }

  return (
    <View style={styles.root}>
      <Map geoPosition={geoPosition} />
      <SearchInput
        props={{
          fetchData,
          setText,
          value: search
        }}
      />
      <InfoTab data={data} />
    </View >
  );
};



const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'red',
  },
});

export default FirstTime;
