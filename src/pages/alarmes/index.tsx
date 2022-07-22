import { View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderLayout from '../HomeScreen/header';
import { Provider, Portal, FAB, Switch } from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Icon } from '@rneui/themed';


import ReactNativeAN from 'react-native-alarm-notification';
import { ScrollView } from 'react-native-gesture-handler';

const Alarme = (props, {navigation}) => {
  const [list, setList] = useState([]);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const updateList = async() => {
    const l = await ReactNativeAN.getScheduledAlarms();
    setList(l)
    setDate(new Date(Date.now()))
  }

/*------------------------------------------------------------DATETIMEPICKER------------------------------------------------------------*/

const [date, setDate] = useState(new Date(Date.now()));
const [show, setShow] = useState(false);

const onChange = (event, selectedDate) => {
  setShow(false);
  setDate(new Date(Date.now()));
  const alarmNotifData = {
    title: 'Alarm',
    message: 'Stand up',
    vibrate: true,
    play_sound: true,
    schedule_type: 'once',
    channel: moment(selectedDate).format('DD-MM-YYYY HH:mm:ss'),
    data: {content: 'my notification id is 22'},
    loop_sound: true,
    has_button: true,
    fire_date: moment(selectedDate).format('DD-MM-YYYY HH:mm:ss')
  }
  ReactNativeAN.scheduleAlarm(alarmNotifData)
  updateList()
};

const showMode = () => {
  setShow(true);
};

/*------------------------------------------------------------DATETIMEPICKER------------------------------------------------------------*/

useFocusEffect(
  React.useCallback(() => {
    updateList();
  }, []),
);

function NewAlarm() {
  props.navigation.navigate('CreateAlarm');
}

const [isSwitchOn, setIsSwitchOn] = React.useState(false);
const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

const uniqueIds = [];

  const uniqueEmployees = list.filter(element => {
    const isDuplicate = uniqueIds.includes(element.channel);

    if (!isDuplicate) {
      uniqueIds.push(element.channel);

      return true;
    }

    return false;
  });


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
              label: 'Novo Alarme todas opções',
              onPress: NewAlarm,
            },
            {
              icon: '',
              label: 'Novo Alarme',
              onPress: showMode,
            },
            {
              icon: '',
              label: 'teste',
              onPress: () => console.log(uniqueEmployees),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          onChange={onChange}
        />
      )}

    {uniqueEmployees[0] == undefined
    ?
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}></Text>
        <Text style={styles.noAlarme}>Não há alarmes ativos</Text>
        <Text style={styles.text}></Text>
      </View>
      <Text style={{marginTop: 10, marginLeft: 10, marginBottom: 10, fontSize: 20, color: 'black'}}>Alarmes</Text>
    </View>
    : 
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Próximo Alarme</Text>
        <Text style={styles.alarme}>{`${list[0].hour}:${list[0].minute}`}</Text>
        <Text style={styles.data}>{`${list[0].day}/${list[0].month}/${list[0].year} | ${list[0].title}`}</Text>
      </View>
        <Text style={{marginTop: 10, marginLeft: 10, marginBottom: 10, fontSize: 20, color: 'black'}}>Alarmes</Text>
      <ScrollView>
      {uniqueEmployees.map((dev) => {
            return (
                  <View style={styles.Tasks} key={dev.id}>
                      <Text style={styles.TitleAlarm} >
                        {`${dev.hour}:${dev.minute}`}
                      </Text>
                    <Text style={styles.DateAlarm}>
                      {`${dev.day}/${dev.month}/${dev.year} | ${dev.title}`}
                    </Text>
                    <TouchableOpacity style={styles.edit} onPress={() => { props.navigation.navigate('Editar Alarme', {id: dev.id, hora: dev.hour, minuto: dev.minute, dia: dev.day, mes: dev.month, ano: dev.year, titulo: dev.title, mensagem: dev.message, canal: dev.channel}) }}>
                      <Icon 
                      name="edit"
                      type="Feather"
                      color="black"
                      style={styles.IconEdit}
                      />
                    </TouchableOpacity>
                  </View>
            )}
      )}
      </ScrollView>
        </View>
      }

    </Provider>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerCollapse: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    textAlign: 'center'
  },
  IconEdit: {
    marginRight: 15,
    marginTop: 30
  },
  textCollapse: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  deleteImage:{
    justifyContent:"center",
    paddingLeft: 5,
  },
  iconRight: {
    marginTop: 5,
    marginRight: 5
  },
  DateAlarm:{
    fontSize: 15,
    alignContent: 'flex-start',
    color:"black",
    marginBottom: 10,
    marginRight:0,
    marginLeft: -100,
    paddingTop: 60,
   },
   edit:{
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    paddingHorizontal: 150,
    marginLeft: 0,
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
    paddingLeft: 10,
    paddingRight: -20, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 10, 
    marginBottom: 5,
    flexDirection:"row",
    marginTop: 5
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
  noAlarme: {
    fontSize: 50,
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