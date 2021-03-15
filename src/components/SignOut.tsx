import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firebase from '../util/firebaseHelper'
import Toast from 'react-native-toast-message'
import { COVID } from '../reserve/data/screenName'

function SignOut() {
    const naviation = useNavigation()
    const handleSignOut = async () => {
        try {
            let response = await firebase.auth().signOut()
            console.log('signing out', response)
            naviation.navigate(COVID)
            setTimeout(() => {
                Toast.show({
                    type: 'true',
                    position: 'top',
                    text1: 'See you later',
                    text2: 'Let me know if you have any question  👋 ',
                    visibilityTime: 3000,
                    topOffset: 100
                });
            }, 1000)
        }
        catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: error.message,
                text2: 'Please try again  👋 ',
                visibilityTime: 3000,
                topOffset: 100
            });
        }
    }
    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default SignOut