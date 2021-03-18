import React, { useContext } from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//component
import Bttn from '../components/common/Bttn'
//helper
import { Context } from '../store/AppContext'
import firebase from '../util/firebaseHelper'
import { getData, removeData } from '../store/localDataHelper'
//reserve
import { DEFAULT } from '../reserve/data/data'
import { SIGNIN } from '../reserve/data/screenName'

function SignOut() {
    const store = useContext(Context)
    const { DISPATCH } = store
    const { RESET_DEFAULT, SET_RESET_STATE, SIGN_OUT } = DISPATCH
    const navigation = useNavigation()
    const handleResetDeafault = async () => {

        try {
            await SET_RESET_STATE(true)
            await removeData(DEFAULT)
            await RESET_DEFAULT()
            await SET_RESET_STATE(true)
        }
        catch (error) {
            console.log('failed to remove data', error)
        }
    }
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
            <Bttn title={'Reset Home Screen'} onPress={handleResetDeafault} height={60} width={120} />
            <Bttn title={'Sign Out'} onPress={handleSignOut} height={60} width={120} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default React.memo(SignOut)