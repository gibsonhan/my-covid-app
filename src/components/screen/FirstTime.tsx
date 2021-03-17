import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useIsFocused } from '@react-navigation/native'
//components
import InfoTab from '../InfoTab'
import Map from '../Map'
import SearchInput from '../../SearchInput'
//helper util
import { Context } from "../../store/AppContext";
import fetchCovidData, { fetchCovidByCountry } from '../../util/fetchCovidData'
import Toast from "react-native-toast-message";
//helper
import { storeData } from '../../store/localDataHelper'
import filterObject from "../../util/filterObject";
import isCountryDataFresh from "../../util/isCountryDataFresh";
import isObjectEmpty from "../../util/isObjectEmpty";
//reserve
import { COUNTRY, DEFAULT, STATE } from '../../reserve/data/data'
import initGeoPos from '../../reserve/map/initGeoPos'

function FirstTime() {
  const { state } = useContext(Context)
  const isFocused = useIsFocused()
  const [list, setList] = useState({});
  const [listType, setListType] = useState(COUNTRY)
  const [geoPosition, setGeoPosition] = useState(initGeoPos)
  const [search, setSearchInput] = useState('');
  const [searching, setSearching] = useState(false)

  const handleFetchData = async () => {
    setSearching(true)
    setListType(STATE)
    try {
      const data = await fetchCovidData(search);
      if (data.error) throw data;

      const { latitude, longitude } = data
      const newGeoPosition = {
        latitude,
        longitude,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }

      setGeoPosition(newGeoPosition)
      const stateSetting = state.setting[DEFAULT]
      const filteredData = filterObject(data, stateSetting)
      setListType(DEFAULT)
      setList(filteredData)
    }
    catch (err) {
      console.log('err', err)
      setGeoPosition(initGeoPos)
    }

    setTimeout(() => {
      setSearching(false)
    }, 0)
  };

  const setText = (text: string) => {
    setSearchInput(text.toLowerCase());
  }
  //Load INIT COVID DATA OF ENTIRE US
  useEffect(() => {
    console.log('firing')
    async function checkLocalData() {
      //check context api for data
      let data = state[COUNTRY]
      const isDataFresh = isCountryDataFresh(data)

      if (!isDataFresh) {
        data = await fetchCovidByCountry()
        setListType(COUNTRY)
        storeData(COUNTRY, data)
      }
      setList(data)
    }
    checkLocalData()
  }, [])

  useEffect(() => {
    async function updateList(type: string) {
      const isEmpty = isObjectEmpty(list)
      if (isEmpty) return

      const countrySetting = state.setting[type]
      const filteredData = filterObject(list, countrySetting)
      setList(filteredData)
    }
    listType === COUNTRY
      ? updateList(COUNTRY)
      : updateList(DEFAULT)
  }, [isFocused])

  return (
    <View style={styles.root}>
      <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} />
      <Map {...geoPosition} />
      <SearchInput {...{ handleFetchData, setText, value: search }} />
      <InfoTab {...{ list, listType, geoPosition, searching }} />
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
