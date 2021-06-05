import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import {
  HomeScreen,
} from '../screen';
import MainBottomNavigation from './bottom-navigation';
import { NavigationRoutes, NavigatorParamList } from './params';
// import { Signup } from '../screen/auth-screens/signup';
// import { Login } from '../screen/auth-screens/login';
// import { HeaderLeft, HeaderRight, HeaderTitle } from './headers';
import { Box, CountdownTimer, Spacing, Text } from '../components';
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
