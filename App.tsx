import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import RealmContextProvider from './src/business/context/RealmContext';

import InitialRoute from './src/routes/routes';


export default function App() {
  return (
    <RealmContextProvider>
      <NavigationContainer>
        <InitialRoute/>
      </NavigationContainer>
    </RealmContextProvider>
  );
};