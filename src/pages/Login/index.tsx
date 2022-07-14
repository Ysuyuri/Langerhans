import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed';

import firebase from '../../config/firebase';
import { CommonActions } from '@react-navigation/native';
require('firebase/auth');

const Login = (props, { navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    const loginFirebase = () => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        props.navigation.replace('ExamesScreen', { email: user.email })
        setEmail("");
        setPassword("");
        setErrorLogin(false)
      })
      .catch((error) => {
        setErrorLogin(true)
        let errorCode = error.code;
        let errorMessage = error.message;
      })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            props.navigation.replace('ExamesScreen');
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
    }, []);

    const TelaCadastro = () => {
      props.navigation.navigate('Cadastro')
      setEmail("");
      setPassword("");
      setErrorLogin(false);
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
      
        <ImageBackground source={require('../../assets/Login.png')} style={styles.background}>
          <View style={styles.container}>
            <Image source={require('../../assets/LogoTCC.png')} style={styles.logo}/>
            <KeyboardAvoidingView behavior='padding'>
            <TextInput style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
    
            <TextInput  style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={(value) => setPassword(value)}
            />

            {errorLogin == true
            ?
              <View style={styles.contentAlert}>
                <Icon name="alert" type="foundation" size={24} color="#bdbdbd"/>
                <Text style={styles.warningAlert}>Email ou senha inválido!</Text>
              </View>
            :
              <View/>
            }
    
            <TouchableOpacity style={styles.botaoLogin} onPress={loginFirebase}> 
              <Text style={styles.botaoTextLogin}>Entrar</Text>          
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.botaoCadastro} onPress={TelaCadastro} > 
              <Text style={styles.botaoTextCadastro}>Cadastrar</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
    );
  };}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerLoading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    background: {
      width: '100%',
      height: '100%'
    },
    logo: {
      width: 200,
      height: 200,
    },
    input: {
      backgroundColor: '#fff',
      marginTop: 10,
      width: 300,
      height: 50,
      fontSize: 16,
      fontWeight: 'bold'
    },
    botaoLogin: {
      width: 300,
      height: 50,
      backgroundColor: '#fff',
      marginTop: 50,
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
    contentAlert:{
      marginTop: 20,
      flexDirection:"row",
      justifyContent: "center",
      alignItems: "center",
    },
    warningAlert:{
      padding: 10,
      color: "#bdbdbd",
      fontSize: 16,
    }
  });

  export default Login;