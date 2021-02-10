import React from "react";
import firebase from '../../util/firebaseHelper'
import { Button, StyleSheet, Text, View } from "react-native";

export interface Props {
    name: string;
    test?: number;
}

const Dashboard: React.FC<Props> = ({ navigation }: any) => {
    const handleSignOut = () => {
        try {
            firebase.auth().signOut()
            navigation.navigate('COVID')
        }
        catch {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: `Failed To Log Out`,
                text2: 'Please try again  👋 ',
                visibilityTime: 3000,
                topOffset: 30,
            })
        }
    }
    return (
        <View style={styles.root}>
            <Text>Dashboard</Text>
            <Button title="sign out" onPress={handleSignOut} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        alignSelf: "center",
    },
});

export default Dashboard;