import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import {
  Folders,
  HomeScreen,
  Signup
} from '../screen';
import MainBottomNavigation from './bottom-navigation';
import { NavigationRoutes, NavigatorParamList } from './params';
const RootStack = createStackNavigator<NavigatorParamList>();

export const RootNavigationContainer = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={NavigationRoutes.Home}
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        <RootStack.Screen
          name={NavigationRoutes.Home}
          component={HomeScreen}
        />
        <RootStack.Screen
          name={NavigationRoutes.SignUp}
          component={Signup}
        />
        <RootStack.Screen
          name={NavigationRoutes.Folders}
          component={Folders}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
