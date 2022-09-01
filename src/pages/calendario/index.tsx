import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, Fragment, useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB, Portal, Provider } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Calendar, CalendarProps } from 'react-native-calendars';
import moment from 'moment';
import ReactNativeAN from 'react-native-alarm-notification';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

const INITIAL_DATE = new Date().toLocaleString() + '';

const Calendario = (props, {navigation}) => {
  function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  const [selected, setSelected] = useState(INITIAL_DATE);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [dateCalendario, setDateCalendario] = useState([])

  const [list, setList] = useState([]);

  const update = async() => {
    const l = await ReactNativeAN.getScheduledAlarms();
    setList(l)
  }

  useFocusEffect(
    React.useCallback(() => {
    update()
    }, []),
  );

  const mark = () => {
    list.map ((dev) => {
      const _data = `${padLeadingZeros(dev.year, 4)}-${padLeadingZeros(dev.month, 2)}-${padLeadingZeros(dev.day, 2)}`
      return {
        _data
      }
    })
  }

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#4EAFC6',
        selectedTextColor: 'white'
      },
      '2022-09-15': {
        dotColor: 'black',
        marked: true
      }
    };
  }, [selected]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDateTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const onChange = (datetime) => {
    const alarmNotifData = {
      title: 'Alarm',
      message: 'Stand up',
      vibrate: true,
      play_sound: true,
      schedule_type: 'once',
      channel: moment(datetime).format('DD-MM-YYYY HH:mm:ss'),
      ticker: 'Calendario',
      loop_sound: true,
      has_button: true,
      fire_date: moment(datetime).format('DD-MM-YYYY HH:mm:ss')
    }
    ReactNativeAN.scheduleAlarm(alarmNotifData)
    hideDateTimePicker();
    update();
  };

  const [dayString, setDay] = useState('');

  const uniqueEmployees = 
  list.filter(dev => {
      return `${dev.ticker}` === 'Calendario';
  });

  const uniqueEmployees2 = 
  uniqueEmployees.filter(dev => {
    return `${padLeadingZeros(dev.year, 2)}-${padLeadingZeros(dev.month, 2)}-${padLeadingZeros(dev.day, 2)}` === dayString
  })

  return (
    <Provider>
    <View style={styles.container}>
      <Fragment>
        <Calendar
          enableSwipeMonths
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={(day) => {
            setDay(day.dateString)
            setSelected(day.dateString)
            update();
          }}
          markedDates={marked}
        />
      </Fragment>
      <ScrollView>
      {uniqueEmployees2.map((dev) => {0
            return (
                  <View style={styles.Tasks} key={dev.id}>
                    <View style={styles.containerCollapse}>
                      <Text style={styles.TitleAlarm} >
                        {`${padLeadingZeros(dev.hour, 2)}:${padLeadingZeros(dev.minute, 2)}`}
                      </Text>
                      <TouchableOpacity style={styles.edit} onPress={() => { props.navigation.navigate('Editar Calendario', {id: dev.id, hora: dev.hour, minuto: dev.minute, dia: dev.day, mes: dev.month, ano: dev.year, titulo: dev.title, mensagem: dev.message, canal: dev.channel, semana: dev.ticker}) }}>
                      <Icon 
                      name="edit"
                      type="Feather"
                      color="black"
                      style={styles.IconEdit}
                      />
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.DateAlarm}>
                      {`${padLeadingZeros(dev.day, 2)}/${padLeadingZeros(dev.month, 2)}/${dev.year} | ${dev.title}`}
                    </Text>
                  </View>
            )}
      )}
      </ScrollView>

      <Portal>
        <FAB.Group
          fabStyle={{backgroundColor: 'white'}}
          open={open}
          icon={open ? 'plus' : 'plus'}
          actions={[
            {
              icon: '',
              label: 'Novo Alarme',
              onPress: showDateTimePicker,
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
        <DateTimePicker
          mode="datetime"
          isVisible={isDatePickerVisible}
          onConfirm={onChange}
          onCancel={hideDateTimePicker}
        />
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create ({
  texto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  calendar: {
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
     flex: 1,
     width: 360,
     alignItems: 'stretch',
     justifyContent: 'flex-end',
     marginLeft: 70,
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
})

export default Calendario;