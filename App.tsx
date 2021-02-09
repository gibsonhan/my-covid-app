import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "./src/components/screen/Account";
import FirstTime from "./src/components/screen/FirstTime";
import FeedBack from "./src/components/screen/Feedback";
import Home from "./src/components/screen/Home";
import RegisterModal from './src/components/modal/RegisterModal'

import { IconSelector } from "./src/util/IconSelector";

const RootStack = createStackNavigator()
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={BottomNav} />
        <RootStack.Screen name="Modal" component={RegisterModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function BottomNav() {
  return (
    <BottomTab.Navigator
      initialRouteName="Login"
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
      <BottomTab.Screen name="Login" component={Account} />
      <BottomTab.Screen name="FeedBack" component={FeedBack} />
    </BottomTab.Navigator>
  )
}

