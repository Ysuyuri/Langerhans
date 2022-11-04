import { View, Text, StyleSheet, Image, ImageBackground, Dimensions} from 'react-native';
import React, { useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
var RNFS = require('react-native-fs')

import firebase from 'firebase';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

export default function Exames(props) {

  const dayjs = require('dayjs')
  const hoje = `${dayjs().toString()}`

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [uid, setUid] = useState('');

  const [data, setData] = useState([])

  const db = firebase.firestore();

useFocusEffect(
  React.useCallback(() => {
    const user = firebase.auth().currentUser;
    if (user) {
        setUid(user.uid);
        firebase.firestore().collection(user.uid).onSnapshot((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
            items.push(doc.data())
          })
          setData(items)
        })
    } else {
    }
  }, []),
);


  const AbrirCamera = () => {
    let options = {
      title: 'Take Image',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        title: 'Nova Imagem',
      },
    }
    ImagePicker.launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        db.collection(uid).doc(response.assets[0].fileName).set({
          name: moment(hoje).format('YYYYMMDDHHmmss'),
          data: moment(hoje).format('DD/MM/YYYY HH:mm'),
          filename: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        })
      }
    })
  }

  const AbrirArquivos = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', 
        title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        db.collection(uid).doc(response.assets[0].fileName).set({
          name: moment(hoje).format('YYYYMMDDHHmmss'),
          data: moment(hoje).format('DD/MM/YYYY HH:mm'),
          filename: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        })
      }
    })
  }

  return (
    <Provider>
      <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        marginLeft: 5,
        marginBottom: 5,
        marginTop: 2,
        color: 'black',
        }}> Arquivos </Text>
          <ScrollView>
          {data == ""
          ?
          <View>
            <View style={{marginTop: 250,justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18, marginVertical: 2, fontWeight: "500"}}>Nenhum arquivo encontrado</Text>
              <Text style={{fontSize: 15, marginVertical: 2}}>Adicione algum arquivo para visualização!</Text>
            </View>
          </View>
          :
            <View/>
          }
          {data.map((dev) => {
            return (
              <View style={styles.Tasks} key={dev.filename}>
                  <TouchableOpacity
                  style={styles.icon}
                  onPress={() => { props.navigation.navigate('ImageShow', { uri: dev.uri, name: dev.filename, uid: uid }) }}
                  >
                    <Icon
                      style={styles.icon}
                      name="ios-document-outline"
                      color="black"
                      size={45}
                    />
                  </TouchableOpacity>
                  <View style={{flex: 1}}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text
                          style={styles.DescriptionImage}
                          onPress={() => { props.navigation.navigate('ImageShow', { uri: dev.uri, name: dev.filename, uid: uid }) }}
                        >
                          {dev.name}
                        </Text>
                        <Text
                          style={styles.DescriptionType}
                          onPress={() => { props.navigation.navigate('ImageShow', { uri: dev.uri, name: dev.filename, uid: uid }) }}
                        >
                          {dev.data}
                        </Text>
                        <Text
                          style={styles.DescriptionType}
                          onPress={() => { props.navigation.navigate('ImageShow', { uri: dev.uri, name: dev.filename, uid: uid }) }}
                        >
                          {dev.type}
                        </Text>
                    </View>
                      <TouchableOpacity
                      onPress={() => {db.collection(uid).doc(dev.filename).delete(); RNFS.unlink(dev.uri)}}
                      >
                        <Icon
                          name="trash-outline"
                          color="black"
                          size={40}
                        />
                      </TouchableOpacity>
                  </View>
                  </View>
                </View>
            )
          })}
          </ScrollView>

        <Portal>
          <FAB.Group
            fabStyle={{backgroundColor: 'white'}}
            open={open}
            icon={open ? 'plus' : 'plus'}
            actions={[
              {
                icon: 'file',
                label: 'Arquivos',
                onPress: AbrirArquivos,
              },
              {
                icon: 'camera',
                label: 'Câmera',
                onPress: AbrirCamera,
                small: false,
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
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
  DescriptionType: {
    marginTop: 0,
    fontSize: 14,
    color: "#838899"
  },
  previewImage: {
    width: '50%',
    backgroundColor: 'black'
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 18,
    marginRight: 16,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontSize: 15,
    marginTop: 2,
  },
  iconLeft: {
    marginLeft: -18
  },
  iconRight: {
    marginTop: 5,
    marginRight: 5
  },
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  itemText: {
    fontSize: 20,
    fontWeight: "500",
    color: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
 },
 containerItem: {
  flex: 1,
  padding: 5,
 },
 Tasks:{
  backgroundColor: "#FFF",
  borderRadius: 5,
  padding: 8,
  flexDirection: "row",
  marginVertical: 8,
  marginTop: 0,
  marginBottom: 0
 },
 deleteImage:{
  alignItems: "flex-end",
  marginHorizontal: 32
 },
 DescriptionImage:{
  fontSize: 15,
  fontWeight: "500",
  color: "#454D65"
 },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  botaoCadastro: {
    width: 300,
    height: 50,
    backgroundColor: '#000000',
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:2,
    borderColor: '#000000'
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})