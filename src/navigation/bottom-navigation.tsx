import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTab } from './bottom-tab';
import { HomeScreen } from '../screen';
import { NavigationRoutes } from './params';
const Tab = createBottomTabNavigator();

const MainBottomNavigation = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name={NavigationRoutes.Home} component={HomeScreen} />
      {/* <Tab.Screen name={NavigationRoutes.Course} component={CourseScreen} /> */}
      {/* <Tab.Screen name={NavigationRoutes.Profile} component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default MainBottomNavigation;
