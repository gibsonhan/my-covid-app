import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { Context } from '../../store/AppContext'
import firebase from '../../util/firebaseHelper'
import Toast from 'react-native-toast-message'



const Dashboard: React.FC<{}> = ({ navigation }: any) => {
    const store = useContext(Context)
    const { SIGN_OUT } = store.DISPATCH
    const handleSignOut = async () => {
        try {
            let response = await firebase.auth().signOut()
            console.log('what is the response', response)
            SIGN_OUT()
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