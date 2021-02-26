import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { getData } from "../../util/localDataHelper";

export interface Props {
  name: string;
  test?: number;
}



const Home: React.FC<Props> = (props) => {
  useEffect(() => {
    async function fetchLocalData() {
      let data = await getData('default')
      console.log('what is local data', data)
    }

    fetchLocalData()
  }, [])
  return (
    <View style={styles.root}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: 'red',
  },
});

export default Home;
