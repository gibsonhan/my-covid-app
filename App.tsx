//import './wdyr'; // <--- first import

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
//store
import { AppContext, Context } from './src/store/AppContext'
//components
import Account from "./src/components/screen/Account";
import Dashboard from "./src/components/screen/Dashboard";
import FirstTime from "./src/components/screen/FirstTime";
import Feedback from "./src/components/screen/Feedback";
import Home from "./src/components/screen/Home";
import RegisterModal from './src/components/modal/RegisterModal'
//functions
import { iconSelector } from './src/util/iconSelector'

const RootStack = createStackNavigator()
const BottomTab = createBottomTabNavigator();

export default function App() {
  function BottomNav() {
    const store = useContext(Context)
    const { idToken } = store.state

    if (idToken.length > 0) {
      return (
        <BottomTab.Navigator
          //initialRouteName="Login"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return iconSelector({
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
          <BottomTab.Screen name="Home" component={Home} />
          <BottomTab.Screen name="Dashboard" component={Dashboard} />
          <BottomTab.Screen name="Feedback" component={Feedback} />
        </BottomTab.Navigator>
      )
    }
    return (
      <BottomTab.Navigator
        //initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return iconSelector({
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
        <BottomTab.Screen name="Home" component={Home} />
        <BottomTab.Screen name="Login" component={Account} />
        <BottomTab.Screen name="Feedback" component={Feedback} />
      </BottomTab.Navigator>
    )
  }
  return (
    <AppContext>
      <NavigationContainer>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Main" component={BottomNav} />
          <RootStack.Screen name="Modal" component={RegisterModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppContext>
  );
}



