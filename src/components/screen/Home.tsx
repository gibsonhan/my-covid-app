import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { useIsFocused } from '@react-navigation/native'
//component
import MyList from '../common/MyList'
//helper
import { Context } from "../../store/AppContext";
import { getData } from '../../store/localDataHelper';
import { COUNTRY, DEFAULT, STATE } from '../../reserve/data/data'
import fetchCovidData from "../../util/fetchCovidData";

function Home() {
  const { state } = useContext(Context)
  const isFocused = useIsFocused()
  const [list, setList] = useState([])
  const [listType, setListType] = useState('')

  useEffect(() => {
    async function fetchData() {
      let data = {}
      let param = ''
      let listType = STATE
      //Check Context API if it has data
      if (state.default.length > 0) {
        param = state.default
        data = await fetchCovidData(param)
      }
      else {
        //Check local data
        try {
          param = await getData(DEFAULT)
          if (param.error) throw param
          data = await fetchCovidData(param)
        }
        catch (error) {
          //if local storage does not have param
          //set list to COUNTRY which is fetch daily on launch
          console.log('No default param in context api or local storage')
          data = await getData(COUNTRY)
          listType = COUNTRY
        }
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
