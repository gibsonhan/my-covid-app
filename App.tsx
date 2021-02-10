import './wdyr'; // <--- first import

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "./src/components/screen/Account";
import Dashboard from "./src/components/screen/Dashboard";
import FirstTime from "./src/components/screen/FirstTime";
import FeedBack from "./src/components/screen/Feedback";
import Home from "./src/components/screen/Home";
import RegisterModal from './src/components/modal/RegisterModal'

import firebase from './src/util/firebaseHelper'
import { IconSelector } from "./src/util/IconSelector";

const RootStack = createStackNavigator()
const BottomTab = createBottomTabNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    let name = firebase.auth().currentUser
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log('please log on')
      }
      else {
        console.log('sup boomer', user)
        setLoggedIn(true)
      }
    })
  }, [])

  function BottomNav({ loggedIn }) {
    console.log('what is user', loggedIn)
    return (
      <BottomTab.Navigator
        //initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return IconSelector({
              routeName: route.name,
              focused,
              size,
              color,
            });
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <BottomTab.Screen name="COVID" component={FirstTime} />
        <BottomTab.Screen name="News" component={Home} />
        {!loggedIn && <BottomTab.Screen name="Login" component={Account} />}
        {loggedIn && <BottomTab.Screen name="Dashboard" component={Dashboard} />}
        <BottomTab.Screen name="FeedBack" component={FeedBack} />
      </BottomTab.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" children={() => <BottomNav loggedIn={loggedIn} />} />
        <RootStack.Screen name="Modal" component={RegisterModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}



