import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import Stores from '../screens/store';
import Profile from '../screens/Profile';
import { nowTheme } from '../constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import AddAddress from '../screens/addAddress';
import Collection from '../screens/collection';
import { navIcon } from '../constants/Images';
import TermCondition from '../screens/terms_condition2';
import Payment2 from '../screens/payment2';
import Orders from '../screens/orders';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ManageAddress" component={Address} options={{ headerShown: false }} />
      <Stack.Screen name="EditAddress" component={EditAddress} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName='Homepage'>
      <Stack.Screen name="Homepage" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Collection" component={Collection} options={{ headerShown: false }} />
      <Stack.Screen name="SearchDetail" component={SearchDetail} options={{ headerShown: false }} />
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
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName='SettingHome' >
      <Stack.Screen name="SettingHome" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Order" component={Orders} options={{ headerShown: false }} />
      <Stack.Screen name="ManageAddress" component={Address} options={{ headerShown: false }} />
      <Stack.Screen name="EditAddress" component={EditAddress} options={{ headerShown: false }} />
      <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: false }} />
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
      <Stack.Screen name="Condition2" component={TermCondition} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
      <Stack.Screen name="Payment2" component={Payment2} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

/*function CustomIcons(props) {
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
*/


function CustomBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', height: 55, backgroundColor: "black", justifyContent: "space-between" }}>
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
        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ alignItems: "center", justifyContent: "center", height: 70, width: 70 }}
          >
            <Image source={navIcon[route.name]} style={{height:30,width:30}} tintColor={isFocused? nowTheme.COLORS.THEME :nowTheme.COLORS.WHITE} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


export default function AppStack(props) {
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={(props) => <CustomBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Cart" component={StoreStack} />
      <Tab.Screen name="Setting" component={SettingStack} />
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