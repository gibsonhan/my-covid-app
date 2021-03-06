import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        return {
            error: true,
            message: 'Failed to save data'
        }
    }
};

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value == null) throw Error
        else {
            return JSON.parse(value);
        }
    } catch (e) {
        return {
            error: true,
            message: `Local data does not exist, please check your key:${key}`
        }
    }
};

const removeData = async (key: string) => {
    try {
        let response = await AsyncStorage.removeItem(key);
        console.log('remove data', response)
    } catch (e) {
        return {
            error: true,
            message: `Failed to remove data with key:${key}`
        }
    }
}

export { getData, removeData, storeData };
