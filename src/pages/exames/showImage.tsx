import React, { useState } from "react";
import { Image, View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Provider, Portal, FAB } from "react-native-paper";
import firebase from 'firebase';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

var RNFS = require('react-native-fs')

const ImgShow = (props, {navigation}) => {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const db = firebase.firestore();
    const uid = props.route.params.uid;
    const filename = props.route.params.name
    const uri = props.route.params.uri;
    const name = props.route.params.fileN;

    const [title, setTitle] = useState(name)

    function AlterarImg() {
        db.collection(uid).doc(filename).update({name: title})
        props.navigation.navigate('ExamesScreen')
    }

    function DeleteImg() {
        db.collection(uid).doc(filename).delete();
        RNFS.unlink(uri);
        props.navigation.navigate('ExamesScreen')
    }

    if (uri == '') {
        props.navigation.navigate('ExamesScreen')
    } else {
    return (
        <Provider>
        <View style={styles.fundo}>
          <View style={styles.opcoes}>
            <Text style={styles.text}>Nome: </Text>
            <TextInput placeholder={name} style={styles.TextInput} onChangeText={setTitle}/>
          </View>
        </View>
        <View style={{flexDirection:"row", marginLeft: 45}}>
        <TouchableOpacity style={styles.ApagarAlarme} onPress={AlterarImg}>
            <Text style={{justifyContent: 'center', color: 'black', fontSize: 15, fontWeight: 'bold'}}>Alterar Nome</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ApagarAlarme} onPress={DeleteImg}>
            <Text style={{justifyContent: 'center', color: 'red', fontSize: 15, fontWeight: 'bold'}}>Apagar Imagem</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <Image
            source={{uri: uri}} 
            style={{
                marginTop: 50,
                resizeMode: "contain",
                height: 600,
                width: '100%'
            }}
            />
        </View>
        </Provider>
    )}
}
const styles = StyleSheet.create({
    container: {
    alignItems: "center",
    top: -50
    },
    fundo: {
        backgroundColor: '#F5F5F5', 
        borderRadius: 10, 
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    opcoes: {
        flexDirection:"row",
        alignItems: 'center',
    },
    text: {
        justifyContent: 'flex-start',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginRight: 5,
        marginLeft: 10,
    },
    TextInput: {
        justifyContent: 'flex-end',
        fontSize: 18,
        fontWeight: 'bold',
        width: '80%'
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
        marginRight: 5,
      },
})


export default ImgShow