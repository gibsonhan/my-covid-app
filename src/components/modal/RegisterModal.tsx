import React, { Children } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationHelpersContext } from "@react-navigation/core";

interface RegisterInteface {
    navigation?: any,
}

const RegisterModal: React.FC<RegisterInteface> = ({ navigation }) => {
    const handleGoBack = () => navigation.goBack()
    return (
        <View style={styles.root}>
            <Text>RegisterModal</Text>
            <Text onPress={handleGoBack}>Cancel</Text>
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
});

export default RegisterModal;
