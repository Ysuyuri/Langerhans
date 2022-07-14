import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { TextInput } from 'react-native-paper';

const EditAlarm = (props) => {

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
const [placeTitulo, setPlaceTitulo] = useState(`Título: ${title}`)


const onChange = (event, selectedDate) => {
    setShow(false);
    setDate(new Date(Date.now()));
    setHour(moment(selectedDate).format('HH:mm'));
  };
  
const showMode = () => {
    setShow(true);
};

  return (
    <View style={styles.container}>
        <Text style={styles.alarme}>{hour}</Text>
        <TouchableOpacity style={styles.EditarHoraBotao} onPress={showMode}> 
              <Text style={styles.EditarHoraTexto}>Alterar</Text>          
        </TouchableOpacity>

        <Text style={styles.TextInput}>{hour}</Text>
        <TextInput style={styles.input}
            placeholder={placeTitulo}
            value=''
            onChangeText={(value) => setTitle(value)}
        />

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
        marginTop: 10,
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
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
        marginTop: 0,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:2,
        borderColor: '#000000'
    },
    EditarHoraTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    TextInput: {
        alignItems: 'flex-start',
        marginTop: 10,
        color: 'black',
        fontSize: 20,
    }
})

export default EditAlarm;