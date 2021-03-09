import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatISO } from 'date-fns'
//components
import InfoTab from '../InfoTab'
import Map from '../Map'
import SearchInput from '../../SearchInput'
//helper util
import fetchCovidData, { fetchCovidByCountry } from '../../util/fetchCovidData'
import initGeoPos from '../../reserve/map/initGeoPos'
import { getData, storeData } from '../../store/localDataHelper'
//reserved words
import { COUNTRY } from '../../reserve/data/data'
import { DATE_CHECKED } from '../../reserve/health/unitedState'
import Toast from "react-native-toast-message";

function FirstTime() {
  const [data, setData] = useState({});
  const [geoPosition, setGeoPosition] = useState(initGeoPos)
  const [search, setSearchInput] = useState("");

  //Load INIT COVID DATA OF ENTIRE US
  useEffect(() => {
    async function fetchData() {
      const localData = await getData(COUNTRY)
      const localDataDate = localData[DATE_CHECKED].slice(0, 10)
      const today = formatISO(new Date()).slice(0, 10)

      if (localData && localDataDate === today) {
        console.log('has local data', localData)
        setData(localData)
        return
      }
      else {
        try {
          console.log('does not have local data')
          const response = await fetchCovidByCountry()
          setData(() => response)
          storeData(COUNTRY, response)
        }
        catch (error) {
          console.log('failed to fetch COVID data for united states')
        }
      }
    }

    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetchCovidData(search);
      console.log('what is response', response)
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
      <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} />
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
  toast: {
    zIndex: 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  }
});

export default FirstTime;
