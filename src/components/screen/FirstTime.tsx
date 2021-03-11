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
import { convertToArray } from "../../util/objToArray";

function FirstTime() {
  const [list, setList] = useState({});
  const [listType, setListType] = useState('')
  const [geoPosition, setGeoPosition] = useState(initGeoPos)
  const [search, setSearchInput] = useState('');

  //Load INIT COVID DATA OF ENTIRE US
  useEffect(() => {
    async function fetchCountryCOVID() {
      const response = await fetchCovidByCountry()
      setList(response)
      setListType(COUNTRY)
      storeData(COUNTRY, response)
    }
    async function checkLocalData() {
      try {
        const localData = await getData(COUNTRY)
        console.log('what is localData', typeof localData)
        if (localData.error) throw localData

        const localDataDate = localData[DATE_CHECKED].slice(0, 10)
        const todayDate = formatISO(new Date()).slice(0, 10)
        const localDataFresh = localDataDate === todayDate

        if (localDataFresh) setList(localData)
        else throw { message: 'data is not fresh' }

      } catch (error) {
        console.log('error', error.message)
        await fetchCountryCOVID()
      }
    }

    checkLocalData()
  }, [])

  const handleFetchData = async () => {
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
      setList(response)
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
      <Map {...geoPosition} />
      <SearchInput {...{ handleFetchData, setText, value: search }} />
      <InfoTab {...{ list, listType }} />
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
