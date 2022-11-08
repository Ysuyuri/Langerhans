import { View, Text, StyleSheet, TouchableOpacity, NativeEventEmitter, NativeModules } from 'react-native';
import React, { useState } from 'react';
import { Provider, Portal, FAB, Switch } from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Icon } from '@rneui/themed';


import ReactNativeAN from 'react-native-alarm-notification';
import { ScrollView } from 'react-native-gesture-handler';
import dayjs from 'dayjs';

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

  const { RNAlarmNotification } = NativeModules;
  const RNAlarmEmitter = new NativeEventEmitter(RNAlarmNotification);

  const dismissSubscription = RNAlarmEmitter.addListener(
    'OnNotificationDismissed', (data) => console.log(JSON.parse(e)));

  const openedSubscription = RNAlarmEmitter.addListener(
    'OnNotificationOpened', (data) => console.log(JSON.parse(e)));

/*------------------------------------------------------------DATETIMEPICKER------------------------------------------------------------*/

const [date, setDate] = useState(new Date(Date.now()));
const [show, setShow] = useState(false);
const _hoje = `${moment(dayjs().toString()).format('YYYYMMDDHHmmss')}`

const onChange = (event, selectedDate) => {
  if (event.type == "set"){
  setDate(new Date(Date.now()));
  setShow(false);
  const DateUpdate = moment().add(1, 'days').format('DD-MM-YYYY')
  if (_hoje > moment(selectedDate).format('YYYYMMDDHHmmss')) {
    const alarmNotifData = {
      title: 'Alarm',
      message: 'Stand up',
      vibrate: true,
      play_sound: true,
      schedule_type: 'once',
      channel: 'wakeup',
      ticker: `${DateUpdate}${moment(selectedDate).format('HHmmss')}`,
      loop_sound: true,
      has_button: true,
      fire_date: `${DateUpdate} ${moment(selectedDate).format('HH:mm:00')}`,
      auto_cancel: true,
      data: { date: `${moment(selectedDate).add(1, 'days').format('DD/MM/YYYY')}`}
    }
    ReactNativeAN.scheduleAlarm(alarmNotifData)
    updateList()
  } else {
    const alarmNotifData = {
      title: 'Alarm',
      message: 'Stand up',
      vibrate: true,
      play_sound: true,
      schedule_type: 'once',
      channel: 'wakeup',
      ticker: moment(selectedDate).format('YYYYMMDDHHmmss'),
      loop_sound: true,
      has_button: true,
      fire_date: moment(selectedDate).format('DD-MM-YYYY HH:mm:00'),
      auto_cancel: true,
      data: {date: `${moment(selectedDate).format('DD/MM/YYYY')}`}
    }
    ReactNativeAN.scheduleAlarm(alarmNotifData)
    updateList()
  }} else {
    setShow(false);
  }
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

function padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function NewAlarm() {
  props.navigation.navigate('CreateAlarm');
}

const [isSwitchOn, setIsSwitchOn] = React.useState(false);
const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

const uniqueIds = [];

  const uniqueEmployees = list.filter(element => {
    const isDuplicate = uniqueIds.includes(element.ticker);

    if (!isDuplicate) {
      uniqueIds.push(element.ticker);

      return true;
    }

    return false;
  });

  const uniqueEmployees2 = uniqueEmployees.filter(dev => {
    return dev.channel !== 'Calendario'
  })

  uniqueEmployees2.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)

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

    {uniqueEmployees2[0] == undefined
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
        <Text style={styles.alarme}>{`${padLeadingZeros(uniqueEmployees2[0].hour, 2)}:${padLeadingZeros(uniqueEmployees2[0].minute, 2)}`}</Text>
        <Text style={styles.data}>{`${padLeadingZeros(uniqueEmployees2[0].title, 2)}`}</Text>
      </View>
        <Text style={{marginTop: 10, marginLeft: 10, marginBottom: 10, fontSize: 20, color: 'black'}}>Alarmes</Text>
      <ScrollView>
      {uniqueEmployees2[0] == undefined
      ?
      <View></View>
      :
      uniqueEmployees2.map((dev) => {
        /*const data = dev.data.split('>')[1].slice(0, -2);
        const splitData = data.split('>')[1];
        const dataEnd = splitData.slice(0, -2);*/
            return (
                  <View style={styles.Tasks} key={dev.id}>
                    <View style={styles.containerCollapse}>
                      <Text style={styles.TitleAlarm} >
                        {`${padLeadingZeros(dev.hour, 2)}:${padLeadingZeros(dev.minute, 2)}`}
                      </Text>
                      <TouchableOpacity style={styles.edit} onPress={() => { props.navigation.navigate('Editar Alarme', {id: dev.id, hora: dev.hour, minuto: dev.minute, dia: dev.day, mes: dev.month, ano: dev.year, titulo: dev.title, mensagem: dev.message, canal: dev.ticker, semanaS: dev.data}) }}>
                      <Icon 
                      name="edit"
                      type="Feather"
                      color="black"
                      style={styles.IconEdit}
                      />
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.DateAlarm}>
                      {`${dev.title}`}
                    </Text>
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
    flexDirection: 'row',
  },
  IconEdit: {
    marginRight: 0,
    marginTop: 0
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
    flexDirection: 'column',
    fontSize: 15,
    color:"black",
    marginBottom: 10,
    marginRight:0,
   },
   edit:{
     width: '100%',
     alignSelf: 'flex-end',
     justifyContent: 'flex-end',
     marginLeft: 60,
   },
  TitleAlarm:{
    flexDirection: 'column',
    fontSize: 40,
    color:"black",
   },
   Tasks:{
    marginBottom: 5,
    paddingLeft: 10,
    backgroundColor: '#F5F5F5', 
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