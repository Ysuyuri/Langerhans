import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, Text, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed';

import firebase from '../../config/firebase';
import { CommonActions } from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
require('firebase/auth');

const novasenha = (props, { navigation }) => {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    useFocusEffect(
      React.useCallback(() => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            props.navigation.replace('ExamesScreen');
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
      }, []),
    );

    const novasenha_ = () => {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            Alert.alert(
                "Alteração de Senha",
                "Foi enviado um email de recuperação de senha para sua conta de E-mail. Caso não encontre, verifique sua caixa de spam.",
                [
                    {
                        text: "Ok",
                        onPress: () => {props.navigation.navigate('Login')}
                    }
                ]
            )
        }).catch((error) => {
          Alert.alert(
            "Erro",
            "Credencial inválida! Tente novamente.",
            [
                {
                    text: "Ok",
                    onPress: () => {setEmail('')}
                }
            ]
        )
        })
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
              placeholderTextColor="#a0a0a0"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
    
            <TouchableOpacity style={styles.botaoLogin} onPress={novasenha_}> 
              <Text style={styles.botaoTextLogin}>Recuperar senha</Text>          
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.botaoCadastro} onPress={() => {props.navigation.navigate('Login')}} > 
              <Text style={styles.botaoTextCadastro}>Voltar</Text>
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
    contentAlert:{
      marginTop: 20,
      flexDirection:"row",
      justifyContent: "center",
      alignItems: "center",
    },
    esqsen: {
    },
    textSenha: {
      marginTop: 10,
      color: 'blue'
    },
    warningAlert:{
      padding: 10,
      color: "#bdbdbd",
      fontSize: 16,
    }
  });

  export default novasenha;