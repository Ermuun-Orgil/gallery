import React, { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Text, Stack, Input } from '../component';
import { NavigationRoutes } from '../navigation/params';
import firebase from '@react-native-firebase/app'

export const HomeScreen: React.FC<any> = () => {
  const navigation = useNavigation();
  const user = firebase.auth().currentUser;
  console.log(user.uid);
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      
      <Box role={'gray'} flex={1} justifyContent={'center'} alignItems={'center'}>
        <Stack size={10}>
          <Button type={'destructive'} width={200} size={'l'} onPress={() => navigation.navigate(NavigationRoutes.SignUp)}>
            <Text role={'black'} type={'title1'}>Sign up</Text>
          </Button>
          <Button type={'destructive'} width={200} size={'l'} onPress={() => navigation.navigate(NavigationRoutes.Folders)}>
            <Text role={'black'} type={'title1'}>Gallery</Text>
          </Button>
        </Stack>
      </Box>
    </SafeAreaView>
  );
};
