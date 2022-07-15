import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ReactNativeAN from 'react-native-alarm-notification';

const EditAlarm = (props, {navigation}) => {

const id = props.route.params.id
const hora = props.route.params.hora
const minuto = props.route.params.minuto
const dia = props.route.params.dia
const mes = props.route.params.mes
const ano = props.route.params.ano
const titulo = props.route.params.titulo
const intervalo = props.route.params.intervalo

const [date, setDate] = useState(new Date(Date.now()));
const [show, setShow] = useState(false);
const [hour, setHour] = useState(`${hora}:${minuto}`)
const [title, setTitle] = useState(titulo);
const [interval, setInterval] = useState();
const [horaEdit, setHoraEdit] = useState(`${dia}-${mes}-${ano} ${hora}:${minuto}:00`)


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
  ReactNativeAN.deleteAlarm(id);
  ReactNativeAN.deleteRepeatingAlarm(id);
  props.navigation.navigate('Alarme')
}

const AlterarAlarm = () => {
  ReactNativeAN.deleteAlarm(id);
  ReactNativeAN.deleteRepeatingAlarm(id);
  const alarmNotifData = {
    title: title,
    message: 'Stand up',
    vibrate: true,
    play_sound: true,
    schedule_type: 'once',
    channel: 'wakeup',
    data: {content: 'my notification id is 22'},
    loop_sound: true,
    has_button: true,
    fire_date: horaEdit
  }
  ReactNativeAN.scheduleAlarm(alarmNotifData)
  props.navigation.navigate('Alarme')
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
        borderWidth:2,
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
      fontWeight: 'bold'
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
    }
})

export default EditAlarm;