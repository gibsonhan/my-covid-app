import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Toast from 'react-native-toast-message'
import SignIn from '../SignIn.native'
//TODO fix that naviation erro
interface AccountInterface {
    navigation: any
}
function Account({ navigation }: AccountInterface) {
    const handleRegNavigation = () => navigation.navigate('Modal')
    return (
        <View style={styles.root}>
            <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} />
            <SignIn />
            <View>
                <Text> Don't Have an Account? </Text>
                <Text onPress={handleRegNavigation}>Sign Up Here</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toast: {
        zIndex: 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
    }
});

export default Account;