import { View, Text, StyleSheet, TouchableOpacity, TextInput,  } from 'react-native';
import React, { useState } from 'react';
import ReactNativeAN from 'react-native-alarm-notification';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const EditCalendario = (props, {navigation}) => {

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

const [title, setTitle] = useState(titulo);
const [mensage, setMensage] = useState(mensagem);
const [list, setList] = useState([]);
const [hour, setHour] = useState(`${hora}`)
const [minute, setMinute] = useState(`${minuto}`)
const [day, setDay] = useState(`${dia}`)
const [month, setMonth] = useState(`${mes}`)
const [year, setYear] = useState(`${ano}`)

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
        }, []),
    );

const DeleteAlarm = () => {
    ReactNativeAN.deleteAlarm(id);
    props.navigation.navigate('Calendário')
}

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const showDateTimePicker = () => {
  setDatePickerVisibility(true);
};

const hideDateTimePicker = () => {
  setDatePickerVisibility(false);
};

const onChange = (datetime) => {
    setHour(moment(datetime).format('HH'));
    setMinute(moment(datetime).format('mm'));
    setDay(moment(datetime).format('DD'))
    setMonth(moment(datetime).format('MM'))
    setYear(moment(datetime).format('YYYY'))
    hideDateTimePicker();
    update();
};

const AlterarAlarme = () => {
    const alarmNotifData = {
        title: title,
        message: mensage,
        vibrate: true,
        play_sound: true,
        schedule_type: 'once',
        channel: canal,
        ticker: 'Calendario',
        loop_sound: true,
        has_button: true,
        fire_date: `${day}-${month}-${year} ${hour}:${minute}:00`
      }
    ReactNativeAN.deleteAlarm(id);
    ReactNativeAN.scheduleAlarm(alarmNotifData)
    props.navigation.navigate('Calendário')
}

  return (
        <View style={styles.container}>
        <Text style={styles.alarme}>{padLeadingZeros(hour, 2)}:{padLeadingZeros(minute, 2)}</Text>
        <Text style={styles.Textdate}>{padLeadingZeros(day, 2)}/{padLeadingZeros(month, 2)}/{padLeadingZeros(year, 2)}</Text>
        <TouchableOpacity style={styles.EditarHoraBotao} onPress={showDateTimePicker}> 
              <Text style={styles.EditarHoraTexto}>Alterar</Text>
        </TouchableOpacity>

        <View style={styles.fundo}>
          <View style={styles.opcoes}>
            <Text style={styles.text}>Título: </Text>
            <TextInput placeholder={titulo} placeholderTextColor="#a0a0a0" style={styles.TextInput} onChangeText={setTitle}/>
          </View>
        </View>

        <View style={styles.fundo}>
          <View style={styles.opcoes}>
            <Text style={styles.text}>Mensagem: </Text>
            <TextInput placeholder={mensagem} placeholderTextColor="#a0a0a0" style={styles.TextInput} onChangeText={setMensage}/>
          </View>
        </View>

        <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.ApagarAlarme} onPress={AlterarAlarme}>
            <Text style={{justifyContent: 'center', color: 'black', fontSize: 15, fontWeight: 'bold'}}>Alterar alarme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ApagarAlarme} onPress={DeleteAlarm}>
            <Text style={{justifyContent: 'center', color: 'red', fontSize: 15, fontWeight: 'bold'}}>Apagar alarme</Text>
          </TouchableOpacity>
        </View>

        <DateTimePicker
          mode="datetime"
          isVisible={isDatePickerVisible}
          onConfirm={onChange}
          onCancel={hideDateTimePicker}
        />
    </View>
  );
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
      },
    Textdate: {
        justifyContent: 'flex-start',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginRight: 5,
        marginTop: -10,
        marginBottom: 25,
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

export default EditCalendario;