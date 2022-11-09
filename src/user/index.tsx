import { View, Text, StyleSheet, TouchableOpacity, Button, ActivityIndicator, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Icon } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase';

const UserConfig = (props, {navigation}) => {

  const db = firebase.firestore();

  const [data, setData] = useState("")
  const [name, setName] = useState("")
  const [uid, setUid] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreName, setShowMoreName] = useState(false)
  const [showMoreEmail, setShowMoreEmail] = useState(false)
  const [showMoreSenha, setShowMoreSenha] = useState(false)

  const [inputEmail, setInputEmail] = useState('')
  const [inputName, setInputName] = useState('')
  const [inputSenha, setInputSenha] = useState('')
  const [confInputSenha, setConfInputSenha] = useState('')
  
  useFocusEffect(
    React.useCallback(() => {
      const user = firebase.auth().currentUser
      setUid(user.uid)
      firebase.firestore().collection(user.uid).onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
              items.push(doc.data())
            })
            setData(items)
            setEmail(user.email)
          })
          const userEmail = firebase.auth().currentUser.email;
          const docRef = db.collection("Users").doc(userEmail);

          docRef.get().then((doc) => {
              if (doc.exists) {
                  setName(doc.data().name);
              }}).catch((error) => {
          })
      setIsLoading(false)
    }, []),
  );

  const editNome = () => {
    if (inputName != ''){
    db.collection('Users').doc(email).update({name: inputName})
    props.navigation.navigate('Exames')}
  }

  const editEmail = () => {
    if (inputEmail != ''){
    firebase.auth().currentUser?.updateEmail(inputEmail).then(() => {
      db.collection('Users').doc(email).update({email: inputEmail})
      props.navigation.navigate('Exames')
    }).catch((error) => {
      Alert.alert(
        "Erro",
        "Email inválido!",
        [
          {
            text: "Ok",
            onPress: () => {setInputEmail('')}
          }
        ])
    })
    }
  }

  const editSenha = () => {
    if (inputSenha != ''){
      if(inputSenha == confInputSenha){
        Alert.alert(
          "Alterar Senha",
          "Alteração efetuada com sucesso!",
          [
            {
              text: "Ok",
              onPress: () => {{
                setInputSenha('')
                setConfInputSenha('')
                firebase.auth().currentUser?.updatePassword(inputSenha)
                props.navigation.navigate('Exames')}}
            }
          ])
        } else {
          Alert.alert(
            "Erro",
            "As senhas não são iguais!",
            [
              {
                text: "Ok",
                onPress: () => {{
                  setInputSenha('')
                  setConfInputSenha('')
                  firebase.auth().currentUser?.updatePassword(inputSenha)
                  props.navigation.navigate('Exames')}}
              }
            ])
        }
      }

  }

  const ExcluirConta = () => {
    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja exlcuir sua conta?",
      [
        {
          text: "Sim",
          onPress: () => {
            firebase.auth().currentUser?.delete()
            props.navigation.navigate('Login')
          }
        },
        {
          text: "Não"
        }
      ]
    )
  }

  if (isLoading == true) {
    return (
        <View style={styles.containerLoading}>
          <ActivityIndicator
            size="large"
            color="#f1c40f"
          />
          <Text>Carregando dados...</Text>
        </View>
    )
  } else {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="person-circle-outline" type="ionicon" color="white" size={180} style={styles.icone}/>
        <Text style={styles.text}>Ysuyuri</Text>
      </View>
      <Button
        onPress={ExcluirConta}
        title="Excluir Conta"
        color="red"
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: '#EFECF4', marginTop: 5 }}>
        <View style={{ marginLeft: 10, marginBottom: 10 }}>
          <Text style={styles.info}>Nome do Usuário:</Text>
          <Text style={styles.dado}>{name}</Text>
        </View>
        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => {
          setShowMoreName(!showMoreName)
          setInputName('')}}>
          <Icon name="edit" type="feather" color="#73788B"/>
        </TouchableOpacity>
      </View>
      {showMoreName
        ?
            <View style={styles.postSubmite}>
              <TextInput 
              multiline={false} 
              numberOfLines={1} 
              style={{ flex: 1, backgroundColor: '#EFECF4', marginLeft: 10 }}
              placeholder='Insira aqui o novo nome que deseja'
              value={inputName}
              onChangeText={(value) => setInputName(value)}>
              </TextInput>
              <View style={styles.submite}>
                <TouchableOpacity onPress={editNome}>
                  <Icon name="send" type="feather" color="#73788B"/>
                </TouchableOpacity>
              </View>
            </View>

        :
        <View/>
        }
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: '#EFECF4', marginTop: 5 }}>
        <View style={{ marginLeft: 10, marginBottom: 10 }}>
          <Text style={styles.info}>E-mail:</Text>
          <Text style={styles.dado}>{email}</Text>
        </View>
        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => {
          setShowMoreEmail(!showMoreEmail)
          setInputEmail('')}}>
          <Icon name="edit" type="feather" color="#73788B"/>
        </TouchableOpacity>
      </View>
      {showMoreEmail
        ?
            <View style={styles.postSubmite}>
              <TextInput 
              multiline={false} 
              numberOfLines={1} 
              style={{ flex: 1, backgroundColor: '#EFECF4', marginLeft: 10 }}
              placeholder='Insira aqui o E-mail nome que deseja'
              value={inputEmail}
              onChangeText={(value) => setInputEmail(value)}>
              </TextInput>
              <View style={styles.submite}>
                <TouchableOpacity onPress={editEmail}>
                  <Icon name="send" type="feather" color="#73788B"/>
                </TouchableOpacity>
              </View>
            </View>

        :
        <View/>
      }
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: '#EFECF4', marginTop: 5 }}>
        <View style={{ marginLeft: 10, marginBottom: 5 }}>
          <Text style={styles.info}>Senha:</Text>
          <Text style={styles.dado}>***********</Text>
        </View>
        <TouchableOpacity style={{ marginRight: 5 }}>
          <Icon name="edit" type="feather" color="#73788B"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  postSubmite: {
    backgroundColor: "#EFECF4",
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center"
  },
  submite: {
    marginTop: 0,
    alignItems: "flex-end",
    marginHorizontal: 10
  },
  header: {
    width: '100%',
    height: 205,
    position: 'relative',
    top: 0,
    left: 0,
    backgroundColor: '#547EC2',
  },
  icone: {
    marginTop: -10
  },
  text: {
    marginTop: -15,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  info: {
    fontSize: 18,
    fontWeight: "500",
    color: "#454D65"
  },
  dado: {
    marginTop: 0,
    fontSize: 16,
    color: "#838899"
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default UserConfig;