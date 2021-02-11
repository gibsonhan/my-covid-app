import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { Context } from '../../store/AppContext'
import { fetchCovidData } from "../../util/dataHelper/fetchCovidData";
import { getData } from "../../store/localDataHelper";

const FirstTime: React.FC<{}> = (props) => {
  const [search, setSearchInput] = useState("");
  const [showData, setShowData] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const fetchData = async () => {
    await fetchCovidData(search);
    setShowSearch(true);
    setShowData(JSON.stringify(await getData('test')));
  };

  const setText = (text: string) => {
    setSearchInput(text.toLowerCase());
  }
  const store = useContext(Context)

  return (
    <View style={styles.root}>
      {showSearch && <Text style={styles.text}>{showData}</Text>}
      <View style={styles.search}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter State or Zip Code"
          onChangeText={setText}
          value={search}
        />
        <Button title="Search" onPress={fetchData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  //TODO GOTTA practice DEM flexbox skills
  text: {
    width: 200,
    flexShrink: 1,
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  search: {
    flexShrink: 1,
    flexDirection: "column",
  },
});

export default FirstTime;
