import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login';
import Register from '../screens/Register';
import Homepage from "../screens/Homepage";
import CompleteRegistration from '../screens/completeRegistration';

const Stack = createStackNavigator();


export default function AuthNavigator() {
    return (
        <Stack.Navigator headerMode="none" initialRouteName='Homepage' >
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Registration" component={CompleteRegistration} />
        </Stack.Navigator>
    )
}
