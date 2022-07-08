import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderLayout from '../HomeScreen/header';
import { Provider, Portal, FAB, Switch } from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import TimeField from 'react-simple-timefield';

import ReactNativeAN from 'react-native-alarm-notification';

const Alarme = (props, {navigation}) => {
  const [list, setList] = useState([]);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const updateList = async() => {
    const l = await ReactNativeAN.getScheduledAlarms();
    setList(l)
  }

useFocusEffect(
  React.useCallback(() => {
    updateList();
  }, []),
);

function NewAlarm() {
  props.navigation.navigate('CreateAlarm');
}
  return (
    <Provider>
      <Portal>
        <FAB.Group
          fabStyle={{backgroundColor: 'white'}}
          open={open}
          icon={open ? 'plus' : 'plus'}
          actions={[
            {
              icon: '',
              label: 'Teste',
              onPress: NewAlarm,
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Próximo Alarme</Text>
        <Text style={styles.alarme}>12:00</Text>
        <Text style={styles.data}>15/07/2000 | Remédio</Text>
      </View>
      <Text style={{marginTop: 10, marginLeft: 10, marginBottom: 10, fontSize: 20, color: 'black'}}>Alarmes</Text>

      {list.map((dev) => {
            return (                
              <View style={{justifyContent: 'center', paddingLeft: 10, backgroundColor: '#F5F5F5', borderRadius: 10, marginBottom: 5}} key={dev.id}>
                  <Text style={styles.TitleAlarm}
                  onPress={ReactNativeAN.deleteAlarm(dev.id)}>
                    {`${dev.hour}:${dev.minute}`}
                  </Text>
                  <Text style={styles.DateAlarm}>
                    {`${dev.day}/${dev.month}/${dev.year} | ${dev.title}`}
                  </Text>
                </View>
            )}
      )}
        </View>

    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  DateAlarm:{
    fontSize: 15,
    alignContent:"flex-start",
    color:"black",
    marginBottom: 5,
    marginLeft: 5
   },
  TitleAlarm:{
    fontSize: 40,
    alignContent:"flex-start",
    padding: 8,
    paddingHorizontal: 0,
    marginBottom: -10,
    marginRight:0,
    color:"black",
   },
   Tasks:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:5
   },
  header: {
    width: '100%',
    height: 205,
    position: 'relative',
    top: 0,
    left: 0,
    backgroundColor: '#547EC2',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
    
  },  
  alarme: {
    fontSize: 100,
    marginTop: -5,
    color: 'white',
    textAlign: 'center'
    
  },  
  data: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
    
  },
});

export default Alarme;