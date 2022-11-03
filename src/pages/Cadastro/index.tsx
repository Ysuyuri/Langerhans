import React, { useState } from 'react';
import { TextInput, Alert, StyleSheet, View, Image, ImageBackground, TouchableOpacity, Text, KeyboardAvoidingView, TouchableNativeFeedbackComponent } from 'react-native';
import { cpf } from 'cpf-cnpj-validator';
import { TextInputMask } from 'react-native-masked-text';

import firebase from '../../config/firebase';
require('firebase/auth');

const Cadastro = ({ navigation }) => {

    const [name, setName] = useState("");
    const [cpf_, setCPF_] = useState("");
    const [email, setEmail] = useState("");
    const [data, setData] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [errorcadastroemail, setErrorCadastroEmail] = useState("");
    
    const db = firebase.firestore();

    function addUser(){
      db.collection("Users").doc(email).set({
        name: name,
        cpf: cpf_,
        data_nascimento: data
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    }

    function registerFirebase() {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        setName("");
        setCPF_("");
        setEmail("");
        setPassword("");
        setConfPassword("");
        setData("");
        addUser();

        navigation.navigate('Login')
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        setErrorCadastroEmail(errorCode)
      })
      if (errorcadastroemail == "auth/invalid-email") {
        Alert.alert("Credenciais Inválidas", "Email inválido. Tente novamente")
        setPassword("");
        setConfPassword("");
      }
      else if (errorcadastroemail == "auth/weak-password") {
        Alert.alert("Credenciais Inválidas", "Tente uma senha de 6 dígitos ou mais.")
        setPassword("");
        setConfPassword("");
      }
      else if (errorcadastroemail == "auth/email-already-in-use") {
        Alert.alert("Credenciais já existentes", "Email já cadastrado")
        setPassword("");
        setConfPassword("");
      }
      }

    const RegistroCredenciais = () => {
      if (!name) {
        Alert.alert("Credencial Inválida", "Nome inválido. Tente novamente.")
        setPassword("");
        setConfPassword("");
      }
      else if (!cpf_) {
        Alert.alert("Credencial Inválida", "CPF inválido. Tente novamente.")
        setPassword("");
        setConfPassword("");
      }
      else if(cpf.isValid(cpf_) == false) {
        Alert.alert("Credencial Inválida", "CPF inválido. Tente novamente.")
        setPassword("");
        setConfPassword("");
      }
      else if (!email) {
        Alert.alert("Credencial Inválida", "Email inválido. Tente novamente.")
        setPassword("");
        setConfPassword("");
      }
      else if (!data) {
        Alert.alert("Credencial Inválida", "Data inválida. Tente novamente.")
        setPassword("");
        setConfPassword("");
      }
      else if (!password) {
        Alert.alert("Credencial Inválida", "Senha inválida. Tente novamente")
        setPassword("");
        setConfPassword("");
      }
      else if (!confpassword) {
        Alert.alert("Credencial Inválida", "Senha inválida. Tente novamente")
        setPassword("");
        setConfPassword("");
      }
      else if (password != confpassword) {
        Alert.alert("Credencial Inválida", "As senhas não são iguais. Tente novamente")
        setPassword("");
        setConfPassword("");
      }
      else {
        registerFirebase();
      }
    }
  
    return (
      <ImageBackground source={require('../../assets/Login.png')} style={styles.background}>
        <View style={styles.container}>
          <Image source={require('../../assets/LogoTCC.png')} style={styles.logo}/>
          <KeyboardAvoidingView behavior='padding'>

          <View style={styles.containerMask}>

          <TextInput style={styles.maskedInput}
            placeholder="Nome"
            value={name}
            onChangeText={(value) => setName(value)}
          />

          </View>

          <View style={styles.containerMask}>

            <TextInputMask 
              type={'cpf'}
              style={styles.maskedInput}
              placeholder="CPF"
              value={cpf_}
              onChangeText={(value) => setCPF_(value)}
            />

          </View>

          <View style={styles.containerMask}>
          
            <TextInputMask 
              type={'datetime'}
              options={{ format: 'DD/MM/YYYY' }}
              style={styles.maskedInput}
              placeholder="Data de Nascimento"
              value={data}
              onChangeText={(value) => setData(value)}
            />

          </View>

          <View style={styles.containerMask}>

          <TextInput  style={styles.maskedInput}
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />

          </View>

          <View style={styles.containerMask}>

          <TextInput  style={styles.maskedInput}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />

          </View>

          <View style={styles.containerMask}>

          <TextInput  style={styles.maskedInput}
            placeholder="Confirme sua senha"
            secureTextEntry
            value={confpassword}
            onChangeText={(value) => setConfPassword(value)}
          />

          </View>
  
          <TouchableOpacity style={styles.botaoLogin} onPress={RegistroCredenciais}> 
            <Text style={styles.botaoTextLogin}>Concluir Cadastro</Text>          
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.botaoCadastro} onPress={ () => navigation.navigate('Login') }> 
            <Text style={styles.botaoTextCadastro}>Voltar</Text>          
          </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      width: '100%',
      height: '100%'
    },
    logo: {
      width: 190,
      height: 150,
      resizeMode: 'contain'
    },
    contentAlert:{
      marginTop: 20,
      flexDirection:"row",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      backgroundColor: '#fff',
      marginTop: 2,
      width: 300,
      height: 43,
      fontSize: 16,
      fontWeight: 'bold'
    },
    maskedInput:{
      flexGrow: 1,
      width: 300,
      height: 43,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 5,
      borderBottomColor: "#999",
      borderBottomWidth: 1,
      borderColor: 'white',
      borderStyle: "solid",
      alignSelf: "flex-start",
      color: "black"
    },
    containerMask:{
      flexDirection: "row",
      marginTop: 2,
      marginLeft: 0,
      marginRight: 5
    },
    warningAlert:{
      padding: 10,
      color: "#bdbdbd",
      fontSize: 16,
    },
    botaoLogin: {
      width: 300,
      height: 50,
      backgroundColor: '#fff',
      marginTop: 30,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:2,
      borderColor: '#000000'
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
    botaoTextLogin: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000'
    },
    botaoTextCadastro: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff'
    },
  });

  export default Cadastro;