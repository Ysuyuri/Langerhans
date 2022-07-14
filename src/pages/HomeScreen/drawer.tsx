import React from 'react';
import exames from '../exames';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
      <Drawer.Navigator screenOptions={{headerShown: true}}>
          <Drawer.Screen name="Exames" component={exames} />
      </Drawer.Navigator>
  );
}