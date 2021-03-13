import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import MyList from '../common/MyList'
import { getData, storeData } from '../../store/localDataHelper';
import { COUNTRY, DEFAULT, STATE } from '../../reserve/data/data'
import fetchCovidData from "../../util/fetchCovidData";

function Home() {
  const [list, setList] = useState([])
  const [listType, setListType] = useState('')

  useEffect(() => {
    async function fetchData() {
      let data = {}
      //IF there is no default, set coutry as deefault data
      try {
        let query = await getData(DEFAULT)
        if (query.error) throw query
        data = await fetchCovidData(query)
        setListType(STATE)
      }
      catch (error) {
        data = await getData(COUNTRY)
        setListType(COUNTRY)
      }
      setList(data)
    }
    fetchData()
  }, [])

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.listContainer}>
        <MyList {...{ list, listType, }} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
  },
  listContainer: {
    marginTop: 100,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  }
});

export default Home;
