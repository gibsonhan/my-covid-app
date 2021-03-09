import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

import MyList from '../common/MyList'
import { getData } from '../../store/localDataHelper';
import { convertToArray } from "../../util/objToArray";

export interface Props {
  name: string;
  test?: number;
}

const Home: React.FC<Props> = (props) => {
  const [list, setList] = useState([])
  useEffect(() => {
    async function fetchLocalData() {
      const data = await getData('default')
      const list = convertToArray(data)
      setList(list)
    }

    fetchLocalData()
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
