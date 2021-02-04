import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Account from "./src/screen/Account";
import FirstTime from "./src/screen/FirstTime";
import FeedBack from "./src/screen/Feedback";
import Home from "./src/screen/Home";
import Login from "./src/screen/Login";

import { IconSelector } from "./src/util/IconSelector";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
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
    </NavigationContainer>
  );
}
