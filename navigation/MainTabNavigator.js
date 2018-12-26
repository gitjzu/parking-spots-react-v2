import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SpotMap from "../components/SpotMap";
import Faq from "../screens/FaqScreen";
import CustomTabBarBottom from "../components/CustomTabBarBottom";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: "Ilmaisparkki",
        tabBarVisible: true,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon name="md-menu" size={25} color={tintColor} />
        )
      }
    },
    Map: {
      screen: SpotMap,
      navigationOptions: {
        title: "Kartta",
        tabBarVisible: true,
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.middleTab}>
            <View style={styles.middleTabHalfCircleBorder} />
            <View style={styles.middleTabIcon}>
              <TabBarIcon focused name="md-map" size={50} color={tintColor} />
            </View>
          </View>
        )
      }
    },
    Faq: {
      screen: Faq,
      navigationOptions: {
        title: "FAQ",
        tabBarVisible: true,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon name="md-help" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      initialRouteName: "Map",
      showIcon: true,
      showLabel: false,
      activeTintColor: "#304ffe",
      style: {
        height: 80,
        width: "100%",
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0
      }
    },
    tabBarComponent: CustomTabBarBottom,
    initialRouteName: "Map",
    optimizationsEnabled: true
  }
);

const styles = StyleSheet.create({
  middleTab: {
    height: 80,
    width: 80,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    bottom: 0,
    backgroundColor: "#F7F7F7",
    position: "relative"
  },
  middleTabHalfCircleBorder: {
    width: 80,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    height: 40,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 0,
    borderColor: "rgba(48,79,254, .3)",
    position: "absolute"
  },
  middleTabIcon: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80
  }
});

const uiTheme = {
  palette: {
    primaryColor: "#304ffe",
    accentColor: "#FF4081"
  }
};
