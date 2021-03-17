import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { useIsFocused } from '@react-navigation/native'
//component
import MyList from '../common/MyList'
//helper
import { Context } from "../../store/AppContext";
import { COUNTRY, STATE } from '../../reserve/data/data'
import isObjectEmpty from "../../util/isObjectEmpty";

function Home() {
  const { state } = useContext(Context)
  const isFocused = useIsFocused()
  const [list, setList] = useState([])
  const [listType, setListType] = useState('')

  useEffect(() => {
    async function fetchData() {
      let isEmpty = isObjectEmpty(state.default)
      let listType = COUNTRY
      let data = {}
      //if default context is not empty  set list type 
      if (!isEmpty) {
        data = state.default
        listType = STATE
      }
      else {
        data = state[COUNTRY]
      }
      setList(data)
      setListType(listType)
    }
    fetchData()
  }, [isFocused])

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
