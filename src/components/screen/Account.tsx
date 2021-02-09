import React, { ReactChild } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import SignIn from '../SignIn'


//TODO fix that naviation erro
interface AccountInterface {
    navigation: any
}
const Account: React.FC<AccountInterface> = ({ navigation }) => {
    const handleNavigation = () => navigation.navigate('Modal')
    return (
        <View style={styles.root}>
            <SignIn />
            <Text style={{ flex: 1 }}>
                Don't Have an Account?
                <span onClick={handleNavigation}>Sign Up Here</span> </Text>
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
    regNavigation: {
        color: 'blue',
    }
});

export default Account;