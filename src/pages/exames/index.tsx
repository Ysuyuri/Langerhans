import { View, Text, StyleSheet, Image, ImageBackground, Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
var RNFS = require('react-native-fs')

import firebase from 'firebase';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function Exames(props) {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [uid, setUid] = useState('');

  const [data, setData] = useState([])

  const db = firebase.firestore();

  useEffect(() => {
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
}, [])

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
          filename: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        })
      }
    })
  }

  return (
    <Provider>
      <Text style={{
        fontSize: 20,
        marginLeft: 5,
        marginBottom: 5,
        marginTop: 2,
        color: 'black',
        }}> Arquivos </Text>
        <ScrollView>
        {data.map((dev) => {
          return (
            <View style={styles.Tasks} key={dev.filename}>
                <TouchableOpacity
                style={styles.deleteImage}
                onPress={() => { props.navigation.navigate('ImageShow', { uri: dev.uri, name: dev.filename, uid: uid }) }}
                >
                  <Icon
                    name="ios-document-outline"
                    color="black"
                    size={50}
                  />
                </TouchableOpacity>
                <Text
                    style={styles.DescriptionImage}
                    onPress={() => { props.navigation.navigate('ImageShow', { uri: dev.uri, name: dev.filename, uid: uid }) }}
                  >
                    {dev.filename}
                  </Text>
                <TouchableOpacity
                style={styles.deleteImage}
                onPress={() => {db.collection(uid).doc(dev.filename).delete(); RNFS.unlink(dev.uri)}}
                >
                  <Icon
                    name="trash-outline"
                    color="black"
                    size={40}
                    style={styles.iconRight}
                  />
                </TouchableOpacity>
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
    </Provider>
  );
};

const styles = StyleSheet.create ({
  texto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  previewImage: {
    width: '50%',
    backgroundColor: 'black'
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
    backgroundColor:"#fff",
    paddingTop: 20
 },
 containerItem: {
  flex: 1,
  padding: 5,
 },
 Tasks:{
  width:"100%",
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:5,
  backgroundColor: '#F5F5F5',
  borderRadius: 10
 },
 deleteImage:{
   justifyContent:"center",
   paddingLeft: 5,
 },
 DescriptionImage:{
  width:"65%",
  alignContent:"flex-start",
  marginLeft: -20,
  padding: 8,
  paddingHorizontal: 0,
  marginBottom: 5,
  marginRight:0,
  color:"black",
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