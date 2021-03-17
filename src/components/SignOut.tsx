import React, { useContext } from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firebase from '../util/firebaseHelper'
import { Context } from '../store/AppContext'
import { SIGNIN } from '../reserve/data/screenName'

function SignOut() {
    const store = useContext(Context)
    const { SIGN_OUT } = store.DISPATCH
    const navigation = useNavigation()
    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut()
            await SIGN_OUT()
            setTimeout(() => {
                navigation.navigate(SIGNIN)
            }, 100)
        }
        catch (error) {
            console.log('what is the error', error)
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

export default React.memo(SignOut)