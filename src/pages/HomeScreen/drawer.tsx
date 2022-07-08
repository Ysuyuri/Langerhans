import React from 'react';
import exames from '../exames';
import social from '../social';
import Alarme from '../alarmes';
import { Icon } from '@rneui/themed';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
      <Drawer.Navigator screenOptions={{headerShown: true}}>
          <Drawer.Screen name="Exames" component={exames} />
      </Drawer.Navigator>
  );
}