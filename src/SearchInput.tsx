import React from 'react';
import { Button, TextInput, StyleSheet, View, Dimensions } from 'react-native';
import OctIcon from 'react-native-vector-icons/Octicons';

import CenterIcon from './components/common/CenterIcon';

export interface SearchInputInterface {
    setText: (text: string) => void;
    fetchData: () => void;
    value?: string;
}
const SearchInput: React.FunctionComponent<{ props: SearchInputInterface }> = ({
    props
}) => {
    const { fetchData, setText, value } = props;
    return (
        <View style={styles.root}>
            <View style={styles.search}>
                <CenterIcon
                    height={40}
                    width={40}
                    icon={<OctIcon name="search" />}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Enter State or Zip Code"
                    onChangeText={setText}
                    value={value}
                />
            </View>
            <Button
                title="Search"
                onPress={fetchData}
                style={{ backgroundColor: 'white' }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    root: {
        zIndex: 1,
        position: 'absolute',
        top: 60
    },
    search: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    textInput: {
        width: Dimensions.get('window').width * 0.5,
        paddingLeft: 10,
        height: 40,
        borderWidth: 0
    }
});
export default SearchInput;
