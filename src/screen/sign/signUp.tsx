import React, { useState, useEffect } from 'react';
import { Box, Input, Text, Button, Stack } from '../../component';
import { useCollection } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoutes } from '../../navigation/params';
import auth from '@react-native-firebase/auth';

export const Signup = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState(null);
  const [code, setCode] = useState('');
  const { updateRecord: createUser } = useCollection('users');
  const [state, setState] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (!user) {
        return;
      }
    });
  }, []);

  async function signInWithPhoneNumber(phoneNumber: any) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+976 ${phoneNumber}`);
      setConfirm(confirmation);
    }
    catch(error) {
      console.log(error);
    }
    
  }

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      await createUser(user && user.uid, state);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  const store = async () => {
    await createUser(user && user.uid, state);
  }

  if (!confirm) {
    return (
      <Box flex={1} role={'white'} justifyContent={'center'} alignItems={'center'}>
        <Stack size={10} alignItems={'center'}>
          <Input
            width={'95%'}
            placeholder={'Утасны дугаар'}
            type={'default'}
            keyboardType={'numeric'}
            onChangeText={setState}
          />
          <Button width={200} onPress={() => signInWithPhoneNumber(state)}>
            <Text>
              ok
            </Text>
          </Button>
        </Stack>
      </Box>
    )
  }

  return (
    <Box flex={1} role={'white'} justifyContent={'center'} alignItems={'center'}>
      <Stack size={10} alignItems={'center'}>
        <Input
          width={'95%'}
          placeholder={'Утасны дугаар'}
          type={'default'}
          keyboardType={'numeric'}
          value={code}
          onChangeText={text => setCode(text)}
        />
        <Button width={200} onPress={() => {confirmCode(), store(), navigation.navigate(NavigationRoutes.Home)}}>
          <Text>
            Burtguuleh
            </Text>
        </Button>
      </Stack>
    </Box>
  )
};
