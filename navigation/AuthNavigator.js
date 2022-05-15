import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login';
import Register from '../screens/Register';
import Homepage from "../screens/Homepage";
import CompleteRegistration from '../screens/completeRegistration';
import ForgetPassword from '../screens/forgotPassword';

const Stack = createStackNavigator();


export default function AuthNavigator() {
    return (
        <Stack.Navigator headerMode="none" initialRouteName='Login' >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Registration" component={CompleteRegistration} />
        </Stack.Navigator>
    )
}
