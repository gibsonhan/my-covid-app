import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import StateJSON from "../reserve/states/AbbtoStates.json";

export interface Props {
  name: string;
  test?: number;
}

const FirstTime: React.FC<Props> = (props) => {
  const [search, setSearchInput] = useState("zipcode, state, country");
  const [showSearch, setShowSearch] = useState(true);

  function findStateCode(search: string) {
    const STATE_CODE: { [key: string]: string } = StateJSON;
    return STATE_CODE[search];
  }

  function validateZip(search: string) {
    let regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
    return regexp.test(search) ? true : false;
  }

  async function fetchCovidDataByZip(zipCode: string) {
    let fedexURl = `http://api.zippopotam.us/us/${zipCode}`;
    const response = await fetch(fedexURl);
    let body = await response.json();
    //temp solution covert zip to state search
    let state = body.places[0]["state abbreviation"];

    const baseUrl = `https://api.covidtracking.com/v1/states/${state}/current.json`;
    let response2 = await fetch(baseUrl);
    let body2 = await response2.json();
    return body2;
  }

  async function fetchCovidByState(state: string) {
    const STATE_CODE = findStateCode(search);
    const baseUrl = `https://api.covidtracking.com/v1/states/${STATE_CODE}/current.json`;
    let response = await fetch(baseUrl);
    let body = await response.json();
    return body;
  }

  const fetchData = async () => {
    let data = NaN;
    try {
      data = validateZip(search)
        ? await fetchCovidDataByZip(search)
        : await fetchCovidByState(search);
    } catch (error) {
      console.log("failed to fetch data", error);
    }

    console.log(data);
  };

  return (
    <View style={styles.root}>
      {showSearch && (
        <View style={styles.search}>
          <TextInput
            style={{
              width: 200,
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
            }}
            placeholder="Enter State or Zip Code"
            onChangeText={(text) => setSearchInput(text.toLocaleLowerCase())}
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
  search: {
    flexDirection: "row",
  },
});

export default FirstTime;
