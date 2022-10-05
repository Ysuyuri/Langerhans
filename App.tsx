import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import RealmContextProvider from './src/business/context/RealmContext';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler'

import Drawers from './src/routes/routes';
import InitialRoute from './src/routes/routes';
import Home from './src/pages/home';

export default function App() {
  return (
    <RealmContextProvider>
      <NavigationContainer>
        <InitialRoute/>
      </NavigationContainer>
    </RealmContextProvider>
  );
};