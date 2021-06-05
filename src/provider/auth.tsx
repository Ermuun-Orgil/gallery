import React, { createContext, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const AuthContext = createContext<{
  user?: FirebaseAuthTypes.User;
  confirmCode: Function;
  signInWithPhoneNumber: Function;
  signOut: () => void;
  code: any;
  number: any;
  setcode: Function;
  setnumber: Function;
  resendCode: Function;
}>({
  user: null,
  code: null,
  number: null,
  confirmCode: () => { },
  signInWithPhoneNumber: () => { },
  signOut: () => { },
  setcode: () => { },
});

export const AuthUserProvider = ({ children }: any) => {
  const [user, setuser] = useState<FirebaseAuthTypes.User>(null);
  const [confirm, setConfirm] = useState<any>(null);
  const [number, setnumber] = useState<string>('');
  const [code, setcode] = useState('');
  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      setuser(user);
      if (!user) {
        return;
      }
    });
  }, []);

  const signInWithPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(`+976 ${number}`);
    setConfirm(confirmation);
    console.log(confirm, ' <= confirm');
  };
  const confirmCode = async () => {
    try {
      await confirm.confirm(code)
    } catch (error) {
      return (error);
    }
  };
  const resendCode = async () => {
    await auth().signInWithPhoneNumber(`+976${number}`);
  };
  const signOut = async () => {
    console.log(user);
    await auth().signOut();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        code,
        number,
        setnumber,
        confirmCode,
        signInWithPhoneNumber,
        signOut,
        setcode,
        resendCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
