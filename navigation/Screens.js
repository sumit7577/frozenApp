import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import Stores from '../screens/store';
import Profile from '../screens/Profile';
import { nowTheme } from '../constants';
import { Icon } from '../components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Address from "../screens/manageAddress";
import EditAddress from '../screens/editAddress';
import Search from '../screens/Search';

const Stack = createStackNavigator();
const TabNav = createBottomTabNavigator();

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ManageAddress" component={Address} options={{ headerShown: false }} />
      <Stack.Screen name="EditAddress" component={EditAddress} options={{ headerShown: false }} />
      {/* <Stack.Screen name="ChangePassword" component={PageView} options={{ title: 'Page View', backgroundColor: '#FFFFFF' }} /> */}
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName='Homepage'>
      <Stack.Screen name="Homepage" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function SearchStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName='SearchHome'>
      <Stack.Screen name="SearchHome" component={Search} options={{ headerShown: false }} />
    </Stack.Navigator>
  )

}

function StoreStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen name="Stores" component={Stores} options={{
        title: "Store",
        headerStyle: { backgroundColor: '#3467eb' },
        headerTitleStyle: { marginLeft: -20, color: nowTheme.COLORS.WHITE },
        headerLeftContainerStyle: { marginLeft: 20 },
        headerRightContainerStyle: { marginRight: 20 },
        headerRight: () => (
          <TouchableOpacity>
            <Icon family="Font-Awesome"
              size={22}
              color={nowTheme.COLORS.WHITE}
              name='shopping-cart' />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity>
            <Icon family="Font-Awesome"
              size={22}
              color={nowTheme.COLORS.WHITE}
              name='user' />
          </TouchableOpacity>
        )
      }}>
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function CustomIcons(props) {
  if (props.name == "Account") {
    return (
      <MaterialCommunityIcons name="account" size={props.size} color={props.color} />
    )
  }
  else if (props.name == "Search") {
    return (
      <Octicons name="search" size={props.size} color={props.color} />
    )
  }
  else if (props.name == "Favourites") {
    return (
      <MaterialIcons name="favorite" size={props.size} color={props.color} />
    )
  }
  else if (props.name == "Cart") {
    return (
      <MaterialCommunityIcons name="cart" size={props.size} color={props.color} />
    )
  }
  else {
    return (
      <MaterialCommunityIcons name={props.name} size={props.size} color={props.color} />
    )
  }
}



function CustomBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', height: 78, backgroundColor: "black", justifyContent: "space-between" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (route.name === "Home") {
          return (null
          )
        }

        else {
          return (
            <TouchableOpacity
              accessibilityRole="button"
              key={index}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ alignItems: "center", justifyContent: "center", backgroundColor: nowTheme.COLORS.THEME, height: 70, width: 70, borderRadius: 50, margin: 7 }}
            >
              <CustomIcons name={label} size={50} color="black" />
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}

export default function AppStack(props) {
  return (
    <TabNav.Navigator tabBar={(props) => <CustomBar {...props} />}
      initialRouteName="Home">
      <TabNav.Screen name="Account" component={ProfileStack} />
      <TabNav.Screen name="Search" component={SearchStack} />
      <TabNav.Screen name="Home" component={HomeStack} />
      <TabNav.Screen name="Favourites" component={ProfileStack} />
      <TabNav.Screen name="Cart" component={StoreStack} />
    </TabNav.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomNavigator: {
    flex: 1,
    backgroundColor: "black",

  },
  navigationIcons: {
    alignItems: "center",
  },
  labelText: {
    fontSize: 15,
    fontWeight: "600",
  }
})