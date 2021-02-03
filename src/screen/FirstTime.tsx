import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

import { fetchCovidData } from "../util/dataHelper/fetchCovidData";

const FirstTime: React.FC<{}> = (props) => {
  const [search, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(true);

  const fetchData = () => fetchCovidData(search);
  const setText = (text: string) => setSearchInput(text.toLowerCase());

  return (
    <View style={styles.root}>
      {showSearch && (
        <View style={styles.search}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter State or Zip Code"
            onChangeText={setText}
          />
          <Button title="Search" onPress={fetchData} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  search: {
    flexDirection: "row",
  },
});

export default FirstTime;
