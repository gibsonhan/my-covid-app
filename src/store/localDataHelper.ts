import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: object) => {
  console.log("storing data", value);
  try {
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      return JSON.parse(value);
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export { getData, storeData };
