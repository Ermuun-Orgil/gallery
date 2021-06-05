import React from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import { Border, Box, LoaderComponent, Queue, Spacing, Text } from '../component';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../component';
// import { NavigationRoutes } from '../../navigation/navigation-params';

export const HomeScreen: React.FC<any> = () => {
  
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      {/* <Header Notification={Notification} /> */}
      <ScrollView>
            <Button onPress={() => console.log('ok')}>
              <Text>okey</Text>
            </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
