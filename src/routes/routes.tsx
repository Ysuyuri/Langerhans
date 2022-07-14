import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import { View } from 'react-native';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Exames from '../pages/exames';
import Alarme from '../pages/alarmes';
import Social from '../pages/social';
import UserConfig from '../user';
import Calendario from '../pages/calendario';
import ImgShow from '../pages/exames/showImage'
import { DrawerContent } from './DrawerContent';

import { Icon } from '@rneui/themed';
import 'react-native-gesture-handler';
import CreateAlarm from '../pages/alarmes/CreateAlarm';
import EditAlarm from '../pages/alarmes/EditAlarm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Drawers(){
  return(
    <Drawer.Navigator drawerContent={props => <DrawerContent {... props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={Tabs} options={{ swipeEnabled: false }}/>
    </Drawer.Navigator>
  )
}

function Tabs(){
  return(
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Exames" component={Exames} options={{tabBarIcon: () => (
        <Icon name="description" size={30} color="black"/>
      )}} />
      <Tab.Screen name="Alarme" component={Alarme} options={{tabBarIcon: () => (
        <Icon name="clock" type="entypo" size={30}  color="black"/>
      )}} />
      <Tab.Screen name="Calendário" component={Calendario} options={{tabBarIcon: () => (
        <Icon name="calendar" type="entypo" size={30} color="black"/>
      )}} />
      <Tab.Screen name="Social" component={Social} options={{tabBarIcon: () => (
        <Icon name="torsos-all" type="foundation" size={30} color="black"/>
      )}} />
    </Tab.Navigator>
  )
}

export default function InitialRoute() {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Route} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

function Route({navigation}) {
  return (
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="Logout" component={InitialRoute} options={{headerShown: false}} />
          <Stack.Screen name="ExamesScreen" component={Drawers} options={{
          headerStyle: { backgroundColor: '#608EDA' },
          headerShown: true,
          gestureEnabled: false,
          title: '',
          headerLeft: () => (
            <View style={{ margin: 10 }}>
                <Icon name="menu" color="white" size={35} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
            </View>
          ),
        }}/>
          <Stack.Screen name="Configurações do usuárioScreen" component={UserConf} options={{headerShown: false}} />
          <Stack.Screen name="ImageShow" component={ImgShow} options={{headerShown: false}} />
          <Stack.Screen name="CreateAlarm" component={CriarAlarme} options={{headerShown: false}} />
          <Stack.Screen name="Editar Alarme" component={EditAlarm} options={{headerShown: true}}/>
        </Stack.Navigator>
  );
};

function UserConf() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Configurações do usuário" component={UserConfig} />
    </Stack.Navigator>
  )
}

function CriarAlarme() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Criar novo Alarme" component={CreateAlarm} />
    </Stack.Navigator>
  )
}