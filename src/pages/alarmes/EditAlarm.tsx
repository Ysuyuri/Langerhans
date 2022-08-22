import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ReactNativeAN from 'react-native-alarm-notification';
import 'react-native-vector-icons'
import { useFocusEffect } from '@react-navigation/native';

const EditAlarm = (props, {navigation}) => {

const id = props.route.params.id
const canal = props.route.params.canal
const hora = props.route.params.hora
const minuto = props.route.params.minuto
const dia = props.route.params.dia
const mes = props.route.params.mes
const ano = props.route.params.ano
const titulo = props.route.params.titulo
const mensagem = props.route.params.mensagem
const semana = props.route.params.semana

const dayjs = require('dayjs')
var weekday = require('dayjs/plugin/weekday')
dayjs.extend(weekday)

/* PRESS Weekly */

const [pressDom, setPressDom] = useState(false)
const [pressSeg, setPressSeg] = useState(false)
const [pressTer, setPressTer] = useState(false)
const [pressQua, setPressQua] = useState(false)
const [pressQui, setPressQui] = useState(false)
const [pressSex, setPressSex] = useState(false)
const [pressSab, setPressSab] = useState(false)

var dataSemana = '';

const [list, setList] = useState([]);

const update = async() => {
  const l = await ReactNativeAN.getScheduledAlarms();
  setList(l)
}

function padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

useFocusEffect(
  React.useCallback(() => {
  update()
  
  if (semana.indexOf('Dom') >= 0) {
    setPressDom(true)
  }
  if (semana.indexOf('Seg') >= 0) {
    setPressSeg(true)
  }
  if (semana.indexOf('Ter') >= 0) {
    setPressTer(true)
  }
  if (semana.indexOf('Qua') >= 0) {
    setPressQua(true)
  }
  if (semana.indexOf('Qui') >= 0) {
    setPressQui(true)
  }
  if (semana.indexOf('Sex') >= 0) {
    setPressSex(true)
  }
  if (semana.indexOf('Sab') >= 0) {
    setPressSab(true)
  }
  }, []),
);

/*--------------*/

const [date, setDate] = useState(new Date(Date.now()));
const [show, setShow] = useState(false);
const [hour, setHour] = useState(`${padLeadingZeros(hora, 2)}:${padLeadingZeros(minuto, 2)}`)
const [title, setTitle] = useState(titulo);
const [mensage, setMensage] = useState(mensagem);
const [horaEdit, setHoraEdit] = useState(`${dia}-${mes}-${ano} ${padLeadingZeros(hora, 2)}:${padLeadingZeros(minuto, 2)}:00`)

const hoje = `${moment(dayjs().toString()).format('DD-MM-YYYY HH:mm:ss')}`
const Domingo = `${moment(dayjs().day(0).toString()).format('DD-MM-YYYY')} ${hour}:00`
const Segunda = `${moment(dayjs().day(1).toString()).format('DD-MM-YYYY')} ${hour}:00`
const Terca = `${moment(dayjs().day(2).toString()).format('DD-MM-YYYY')} ${hour}:00`
const Quarta = `${moment(dayjs().day(3).toString()).format('DD-MM-YYYY')} ${hour}:00`
const Quinta = `${moment(dayjs().day(4).toString()).format('DD-MM-YYYY')} ${hour}:00`
const Sexta = `${moment(dayjs().day(5).toString()).format('DD-MM-YYYY')} ${hour}:00`
const Sabado = `${moment(dayjs().day(6).toString()).format('DD-MM-YYYY')} ${hour}:00`

const onChange = (event, selectedDate) => {
    setShow(false);
    setDate(new Date(Date.now()));
    setHour(moment(selectedDate).format('HH:mm'));
    setHoraEdit(moment(selectedDate).format('DD-MM-YYYY HH:mm:ss'))
  };
  
const showMode = () => {
    setShow(true);
};

const DeleteAlarm = () => {
  const searchId = list.filter(dev => {
    return dev.channel === canal;
  })
  searchId.map((dev) => {
    ReactNativeAN.deleteAlarm(dev.id);
    ReactNativeAN.deleteRepeatingAlarm(dev.id);
  })
  props.navigation.navigate('Alarme')
}

const AlterarAlarm = () => {

  if (pressDom == true) {
    dataSemana = dataSemana + '|Dom'
  } 
  if (pressSeg == true) {
    dataSemana = dataSemana + '|Seg'
  }
  if (pressTer == true) {
    dataSemana = dataSemana + '|Ter'
  }
  if (pressQua == true) {
    dataSemana = dataSemana + '|Qua'
  }
  if (pressQui == true) {
    dataSemana = dataSemana + '|Qui'
  }
  if (pressSex == true) {
    dataSemana = dataSemana + '|Sex'
  }
  if (pressSab == true) {
    dataSemana = dataSemana + '|Sab'
  }

  if (pressDom == false && pressSeg == false && pressTer == false && pressQua == false && pressQui == false && pressSex == false && pressSab == false) {
    ReactNativeAN.deleteAlarm(id);
    ReactNativeAN.deleteRepeatingAlarm(id);
    const alarmNotifData = {
      title: title,
      message: 'Stand up',
      vibrate: true,
      play_sound: true,
      schedule_type: 'once',
      channel: id,
      ticker: 'Hoje',
      loop_sound: true,
      has_button: true,
      fire_date: horaEdit
    }
    ReactNativeAN.scheduleAlarm(alarmNotifData)
    props.navigation.navigate('Alarme')
  }
  else {
    ReactNativeAN.deleteAlarm(id);
    ReactNativeAN.deleteRepeatingAlarm(id);
    if (pressDom == true) {
      const searchId = list.filter(dev => {
        return dev.channel === canal;
      })
      searchId.map((dev) => {
        ReactNativeAN.deleteAlarm(dev.id);
        ReactNativeAN.deleteRepeatingAlarm(dev.id);
      })
      if (hoje > Domingo) {
        const DomingoUpdate = moment().add(1, 'weeks').isoWeekday(0).format('DD-MM-YYYY')

        const alarmNotifData = {
          title: title,
          message: mensage,
          vibrate: true,
          play_sound: true,
          channel: `${hour} repeat`,
          ticker: dataSemana,
          loop_sound: true,
          schedule_type: 'repeat',
          repeat_interval: 'weekly',
          fire_date: `${DomingoUpdate} ${hour}:00`
        }
        ReactNativeAN.scheduleAlarm(alarmNotifData)
        props.navigation.navigate('Alarme')
      }
      else {
        const alarmNotifData = {
          title: title,
          message: mensage,
          vibrate: true,
          play_sound: true,
          channel: `${moment(Domingo).format('HHmm')} repeat`,
          ticker: dataSemana,
          loop_sound: true,
          schedule_type: 'repeat',
          repeat_interval: 'weekly',
          fire_date: `${Domingo}`
        }
        ReactNativeAN.scheduleAlarm(alarmNotifData)
        props.navigation.navigate('Alarme')
      }
    }
    if (pressSeg == true) {
      if (hoje > Segunda) {
          const SegundaUpdate = moment().add(1, 'weeks').isoWeekday(1).format('DD-MM-YYYY')
          const alarmNotifData = {
            title: title,
            message: mensage,
            vibrate: true,
            play_sound: true,
            channel: `${hour} repeat`,
            ticker: dataSemana,
            loop_sound: true,
            schedule_type: 'repeat',
            repeat_interval: 'weekly',
            fire_date: `${SegundaUpdate} ${hour}:00`
          }
          ReactNativeAN.scheduleAlarm(alarmNotifData)
          props.navigation.navigate('Alarme')
        }
        else {
          const alarmNotifData = {
            title: title,
            message: mensage,
            vibrate: true,
            play_sound: true,
            channel: `${moment(Segunda).format('HHmm')} repeat`,
            ticker: dataSemana,
            loop_sound: true,
            schedule_type: 'repeat',
            repeat_interval: 'weekly',
            fire_date: `${Segunda}`
          }
          ReactNativeAN.scheduleAlarm(alarmNotifData)
          props.navigation.navigate('Alarme')
        }
      }
        if (pressTer == true) {
          if (hoje > Terca) {
            const TercaUpdate = moment().add(1, 'weeks').isoWeekday(2).format('DD-MM-YYYY')
            const alarmNotifData = {
              title: title,
              message: mensage,
              vibrate: true,
              play_sound: true,
              channel: `${hour} repeat`,
              ticker: dataSemana,
              loop_sound: true,
              schedule_type: 'repeat',
              repeat_interval: 'weekly',
              fire_date: `${TercaUpdate} ${hour}:00`
            }
            ReactNativeAN.scheduleAlarm(alarmNotifData)
            props.navigation.navigate('Alarme')
          }
          else {
            const alarmNotifData = {
              title: title,
              message: mensage,
              vibrate: true,
              play_sound: true,
              channel: `${moment(Terca).format('HHmm')} repeat`,
              ticker: dataSemana,
              loop_sound: true,
              schedule_type: 'repeat',
              repeat_interval: 'weekly',
              fire_date: `${Terca}`
            }
            ReactNativeAN.scheduleAlarm(alarmNotifData)
            props.navigation.navigate('Alarme')
          }
        }
          if (pressQua == true) {
            if (hoje > Quarta) {
              const QuartaUpdate = moment().add(1, 'weeks').isoWeekday(3).format('DD-MM-YYYY')
              const alarmNotifData = {
                title: title,
                message: mensage,
                vibrate: true,
                play_sound: true,
                channel: `${hour} repeat`,
                ticker: dataSemana,
                loop_sound: true,
                schedule_type: 'repeat',
                repeat_interval: 'weekly',
                fire_date: `${QuartaUpdate} ${hour}:00`
              }
              ReactNativeAN.scheduleAlarm(alarmNotifData)
              props.navigation.navigate('Alarme')
            }
            else {
              const alarmNotifData = {
                title: title,
                message: mensage,
                vibrate: true,
                play_sound: true,
                channel: `${moment(Quarta).format('HHmm')} repeat`,
                ticker: dataSemana,
                loop_sound: true,
                schedule_type: 'repeat',
                repeat_interval: 'weekly',
                fire_date: `${Quarta}`
              }
              ReactNativeAN.scheduleAlarm(alarmNotifData)
              props.navigation.navigate('Alarme')
            }
          }
            if (pressQui == true) {
              if (hoje > Quinta) {
                const QuintaUpdate = moment().add(1, 'weeks').isoWeekday(4).format('DD-MM-YYYY')
                const alarmNotifData = {
                  title: title,
                  message: mensage,
                  vibrate: true,
                  play_sound: true,
                  channel: `${hour} repeat`,
                  ticker: dataSemana,
                  loop_sound: true,
                  schedule_type: 'repeat',
                  repeat_interval: 'weekly',
                  fire_date: `${QuintaUpdate} ${hour}:00`
                }
                ReactNativeAN.scheduleAlarm(alarmNotifData)
                props.navigation.navigate('Alarme')
              }
              else {
                const alarmNotifData = {
                  title: title,
                  message: mensage,
                  vibrate: true,
                  play_sound: true,
                  channel: `${moment(Quinta).format('HHmm')} repeat`,
                  ticker: dataSemana,
                  loop_sound: true,
                  schedule_type: 'repeat',
                  repeat_interval: 'weekly',
                  fire_date: `${Quinta}`
                }
                ReactNativeAN.scheduleAlarm(alarmNotifData)
                props.navigation.navigate('Alarme')
              }
            }
              if (pressSex == true) {
                if (hoje > Sexta) {
                  const SextaUpdate = moment().add(1, 'weeks').isoWeekday(5).format('DD-MM-YYYY')
                  const alarmNotifData = {
                    title: title,
                    message: mensage,
                    vibrate: true,
                    play_sound: true,
                    channel: `${hour} repeat`,
                    ticker: dataSemana,
                    loop_sound: true,
                    schedule_type: 'repeat',
                    repeat_interval: 'weekly',
                    fire_date: `${SextaUpdate} ${hour}:00`
                  }
                  ReactNativeAN.scheduleAlarm(alarmNotifData)
                  props.navigation.navigate('Alarme')
                }
                else {
                  const alarmNotifData = {
                    title: title,
                    message: mensage,
                    vibrate: true,
                    play_sound: true,
                    channel: `${moment(Sexta).format('HHmm')} repeat`,
                    ticker: dataSemana,
                    loop_sound: true,
                    schedule_type: 'repeat',
                    repeat_interval: 'weekly',
                    fire_date: `${Sexta}`
                  }
                  ReactNativeAN.scheduleAlarm(alarmNotifData)
                  props.navigation.navigate('Alarme')
                }
              }
                if (pressSab == true) {
                  if (hoje > Sabado) {
                    const SabadoUpdate = moment().add(1, 'weeks').isoWeekday(6).format('DD-MM-YYYY')
                    const alarmNotifData = {
                      title: title,
                      message: mensage,
                      vibrate: true,
                      play_sound: true,
                      channel: `${hour} repeat`,
                      ticker: dataSemana,
                      loop_sound: true,
                      schedule_type: 'repeat',
                      repeat_interval: 'weekly',
                      fire_date: `${SabadoUpdate} ${hour}:00`
                    }
                    ReactNativeAN.scheduleAlarm(alarmNotifData)
                    props.navigation.navigate('Alarme')
                  }
                  else {
                    const alarmNotifData = {
                      title: title,
                      message: mensage,
                      vibrate: true,
                      play_sound: true,
                      channel: `${moment(Sabado).format('HHmm')} repeat`,
                      ticker: dataSemana,
                      loop_sound: true,
                      schedule_type: 'repeat',
                      repeat_interval: 'weekly',
                      fire_date: `${Sabado}`
                    }
                    ReactNativeAN.scheduleAlarm(alarmNotifData)
                    props.navigation.navigate('Alarme')
                  }
                }  
        }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.alarme}>{hour}</Text>
        <TouchableOpacity style={styles.EditarHoraBotao} onPress={showMode}> 
              <Text style={styles.EditarHoraTexto}>Alterar</Text>          
        </TouchableOpacity>

        <View style={styles.fundo}>
          <View style={styles.opcoes}>
            <Text style={styles.text}>Título: </Text>
            <TextInput placeholder={titulo} style={styles.TextInput} onChangeText={setTitle}/>
          </View>
        </View>

        <View style={styles.fundo}>
          <View style={styles.opcoes}>
            <Text style={styles.text}>Mensagem: </Text>
            <TextInput placeholder={mensagem} style={styles.TextInput} onChangeText={setMensage}/>
          </View>
        </View>

        <View style={styles.fundoSemana}>
              <View style={{justifyContent: 'center', alignContent: 'center', flexDirection:"row"}}>
                {pressDom == false
                ?
                <TouchableOpacity style={styles.offPress} onPress={() => setPressDom(true)}>
                  <Text style={{fontSize: 11, color: 'black'}}>Dom</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.onPress} onPress={() => setPressDom(false)}>
                  <Text style={{fontSize: 11, color: 'black'}}>Dom</Text>
                </TouchableOpacity>
                }
                {pressSeg == false
                ?
                <TouchableOpacity style={styles.offPress} onPress={() => setPressSeg(true)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Seg</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.onPress} onPress={() => setPressSeg(false)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Seg</Text>
                </TouchableOpacity>
                }
                {pressTer == false
                ?
                <TouchableOpacity style={styles.offPress} onPress={() => setPressTer(true)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Ter</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.onPress} onPress={() => setPressTer(false)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Ter</Text>
                </TouchableOpacity>
                }
                {pressQua == false
                ?
                <TouchableOpacity style={styles.offPress} onPress={() => setPressQua(true)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Qua</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.onPress} onPress={() => setPressQua(false)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Qua</Text>
                </TouchableOpacity>
                }
                {pressQui == false
                ?
                <TouchableOpacity style={styles.offPress} onPress={() => setPressQui(true)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Qui</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.onPress} onPress={() => setPressQui(false)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Qui</Text>
                </TouchableOpacity>
                }
                {pressSex == false
                ?
                <TouchableOpacity style={styles.offPress} onPress={() => setPressSex(true)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Sex</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.onPress} onPress={() => setPressSex(false)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Sex</Text>
                </TouchableOpacity>
                }
                {pressSab == false
                ?
                <TouchableOpacity style={styles.offPress} onPress={() => setPressSab(true)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Sab</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.onPress} onPress={() => setPressSab(false)}>
                  <Text style={{fontSize: 13, color: 'black'}}>Sab</Text>
                </TouchableOpacity>
                }
              </View>
        </View>

        <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.ApagarAlarme} onPress={AlterarAlarm}>
            <Text style={{justifyContent: 'center', color: 'black', fontSize: 15, fontWeight: 'bold'}}>Alterar alarme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ApagarAlarme} onPress={DeleteAlarm}>
            <Text style={{justifyContent: 'center', color: 'red', fontSize: 15, fontWeight: 'bold'}}>Apagar alarme</Text>
          </TouchableOpacity>
        </View>

    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
      },
    header: {
        width: '100%',
        height: 205,
        position: 'relative',
        top: 0,
        left: 0,
    },
    offPress: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#C0C0C0',
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 5
    },
    onPress: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#C0C0C0',
      borderWidth: 1,
      borderColor: 'black',
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 5
    },
    input: {
        backgroundColor: '#fff',
        marginTop: 30,
        width: 300,
        height: 50,
        fontSize: 16,
        fontWeight: 'bold'
    },
    text: {
      justifyContent: 'flex-start',
      fontSize: 18,
      color: 'black',
      fontWeight: 'bold',
      marginRight: 5
    },  
    alarme: {
        fontSize: 100,
        marginTop: 20,
        color: 'black',
        textAlign: 'center'
    },
    EditarHoraBotao: {
        width: 150,
        height: 50,
        backgroundColor: '#000000',
        marginBottom: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000000'
    },
    ApagarAlarme: {
      width: 150,
      height: 50,
      backgroundColor: '#F5F5F5',
      marginTop: 10,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:1,
      borderColor: '#fff',
      marginRight: 5
    },
    EditarHoraTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    TextInput: {
      justifyContent: 'flex-end',
      fontSize: 18,
      fontWeight: 'bold',
      width: '80%'
    },
    opcoes: {
      flexDirection:"row",
      alignItems: 'center',
      padding: 10, 
    },
    fundo: {
      backgroundColor: '#F5F5F5', 
      borderRadius: 10, 
      marginTop: 1,
      borderWidth: 1,
      borderColor: 'white',
      width: '90%'
    },
    fundoSemana: {
      justifyContent: 'center',
      backgroundColor: '#F5F5F5', 
      borderRadius: 10, 
      marginTop: 1,
      borderWidth: 1,
      borderColor: 'white',
      width: '90%',
      flexDirection:"row"
    }
})

export default EditAlarm;

function useSetState(arg0: string): [any, any, any] {
  throw new Error('Function not implemented.');
}
