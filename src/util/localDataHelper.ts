import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export { getData, storeData };
