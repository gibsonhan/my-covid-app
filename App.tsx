import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";

import FirstTime from "./src/screen/FirstTime";
import Home from "./src/screen/Home";
import Login from "./src/screen/Login";

const BottomTab = createBottomTabNavigator();

export default function App() {
  function IconSelector(options: {
    routeName: string;
    focused: boolean;
    size: number;
    color: string;
  }) {
    const { routeName, focused, size, color } = options;
    if (routeName === "COVID")
      return <MaterialIcon name="coronavirus" size={size} color={color} />;
    else if (routeName === "News")
      return <EntypoIcon name="line-graph" size={size} color={color} />;
    else if (routeName === "Login")
      return <AntIcon name="login" size={size} color={color} />;
    else return <MaterialIcon name="feedback" size={size} color={color} />;
  }

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
        <BottomTab.Screen name="Login" component={Login} />
        <BottomTab.Screen name="FeedBack" component={Login} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
