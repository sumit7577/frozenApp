import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import Stores from '../screens/store';
import Profile from '../screens/Profile';
import { nowTheme } from '../constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Address from "../screens/manageAddress";
import EditAddress from '../screens/editAddress';
import Search from '../screens/Search';
import SearchDetail from '../screens/searchDetail';
import Payment from '../screens/payment';
import Settings from '../screens/Settings';
import Policy from '../screens/policy';
import Contact from '../screens/contact';
import Condition from '../screens/condition';
import Summary from '../screens/summary';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



const Stack = createStackNavigator();
const TabNav = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

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
      <Stack.Screen name="SearchDetail" component={SearchDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  )

}

function SettingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName='Settings' >
      <Stack.Screen name="SettingHome" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ManageAddress" component={Address} options={{ headerShown: false }} />
      <Stack.Screen name="EditAddress" component={EditAddress} options={{ headerShown: false }} />
      <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
      <Stack.Screen name="Policy" component={Policy} options={{ headerShown: false }} />
      <Stack.Screen name="Condition" component={Condition} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function StoreStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName='Stores'>
      <Stack.Screen name="Stores" component={Stores} options={{ headerShown: false }} />
      <Stack.Screen name="Summary" component={Summary} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function CustomIcons(props) {
  if (props.name == "Account") {
    return (
      <MaterialCommunityIcons name="account-outline" size={props.size} color={props.color} />
    )
  }
  else if (props.name == "Search") {
    return (
      <Octicons name="search" size={props.size} color={props.color} style={{ transform: [{ rotateY: '180deg' }] }} />
    )
  }
  else if (props.name == "Favourites") {
    return (
      <MaterialIcons name="favorite-outline" size={props.size} color={props.color} />
    )
  }
  else if (props.name == "Cart") {
    return (
      <SimpleLineIcons name="handbag" size={props.size - 8} color={props.color} />
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
              style={{ alignItems: "center", justifyContent: "center", height: 70, width: 70, margin: 4 }}
            >
              <CustomIcons name={label} size={35} color={nowTheme.COLORS.THEME} />
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}

export default function AppStack(props) {
  return (
    <Tab.Navigator initialRouteName="Home" barStyle={{ backgroundColor: nowTheme.COLORS.WHITE }}
      activeColor={nowTheme.COLORS.THEME}
      inactiveColor={nowTheme.COLORS.MUTED} 
      labeled={false}>
      <Tab.Screen name="Home" component={HomeStack} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Entypo name="home" color={color} size={24} />
        ),
      }} />
      <Tab.Screen name="Search" component={SearchStack} options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color }) => (
          <Octicons name="search" color={color} size={23} />
        ),
      }} />

      <Tab.Screen name="Cart" component={StoreStack} options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cart" size={24} color={color} />
        ),
      }} />
      <Tab.Screen name="Setting" component={SettingStack} options={{
        tabBarLabel: 'Setting',
        tabBarIcon: ({ color }) => (
          <Octicons name="three-bars" color={color} size={24} />
        ),
      }} />
    </Tab.Navigator>
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