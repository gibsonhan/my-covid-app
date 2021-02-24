import React from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';
import OctIcon from 'react-native-vector-icons/Octicons';

export interface SearchInputInterface {
    setText: (text: string) => void,
    fetchData: () => void,
    value?: string
}
const SearchInput: React.FunctionComponent<{ props: SearchInputInterface }> = ({ props }) => {
    const { fetchData, setText, value } = props
    return (
        <View style={styles.search}>
            <TextInput
                style={styles.textInput}
                placeholder="Enter State or Zip Code"
                onChangeText={setText}
                value={value}
            />
            <OctIcon name="search" />
            <Button title="Search" onPress={fetchData} />
        </View>
    )
}
const styles = StyleSheet.create({
    search: {
        zIndex: 1,
        position: 'absolute',
        top: 100,
        backgroundColor: 'gray',
        flexDirection: "column",
        justifyContent: 'center',
    },
    textInput: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },

});
export default SearchInput;

