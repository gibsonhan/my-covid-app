import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

import MyList from '../common/MyList'
import { getData } from '../../store/localDataHelper';
import { convertToArray } from "../../util/objToArray";
import { COUNTRY, DEFAULT } from '../../reserve/data/data'

function Home() {
  const [list, setList] = useState([])
  useEffect(() => {
    async function fetchData() {
      let data = {}
      let list = [{}]
      //IF there is no default, set coutry as deefault data
      try {
        data = await getData(DEFAULT)
        if (data.error) throw data
      }
      catch (error) {
        data = await getData(COUNTRY)
      }

      list = convertToArray(data)
      setList(list)
    }

    fetchData()
  }, [])

  //if (list.length < 0) return <>Loading...</>
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.listContainer}>
        <MyList data={list} />
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
