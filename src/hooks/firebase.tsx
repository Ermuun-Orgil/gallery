import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

export const useDocument = (path: string) => {
  const [doc, setDoc] = useState(null);
  useEffect(() => {
    firestore()
      .doc(path)
      .onSnapshot((res: any) => setDoc(res.data()));
  }, [path]);
  const updateRecord = (data: any) => {
    firestore()
      .doc(path)
      .set(
        {
          ...data,
        },
        { merge: true }
      );
  };

  const deleteRecord = () => firestore().doc(path).delete();
  return { doc, updateRecord, deleteRecord };
};

export const useCollection = (path: any) => {
  const [collection, setCollection] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const createRecord = (data: any) => {
    firestore().collection(path).add(data);
  };
  const updateRecord = (id: any, data: any) => {
    firestore()
      .collection(path)
      .doc(id)
      .set({ ...data }, { merge: true });
  };
  const deleteRecord = (id: any) => {
    return firestore().collection(path).doc(id).delete();
  };

  useEffect(() => {
    setLoading(true);
    if (path) {
      const unsubscribe = firestore()
        .collection(path)
        .onSnapshot((querySnapshot) => {
          if (querySnapshot)
            setCollection(querySnapshot.docs.map((doc) => doc.data()));
          else
            setCollection([]);
        });
      return () => unsubscribe();
    }
    setLoading(false);
  }, [path]);
  return { collection, createRecord, updateRecord, deleteRecord, loading };
};
