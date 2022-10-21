import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import 'react-native-get-random-values';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid'
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import moment from 'moment';

const Postshow = (props, {navigation}) => {
    
    const db = firebase.firestore();
    const dayjs = require('dayjs')

    const Id = props.route.params.comentUid;
    const NomePost = props.route.params.usuPost
    const Post = props.route.params.post
    const DataPost = props.route.params.datapost;
    const gennerate: string = uuid();
    const hoje = `${moment(dayjs().toString()).format('DD/MM/YYYY HH:mm')}`
    
    const [data, setData] = useState([])
    const [post, setPost] = useState("")
    const [name, setName] = useState("")

    useFocusEffect(
        React.useCallback(() => {
            firebase.firestore().collection("Posts").doc(Id).collection("Coments").onSnapshot((querySnapshot) => {
                const items = []
                querySnapshot.forEach((doc) => {
                  items.push(doc.data())
                })
                setData(items)
              })
              const userEmail = firebase.auth().currentUser.email;
              const docRef = db.collection("Users").doc(userEmail);

              docRef.get().then((doc) => {
                  if (doc.exists) {
                      setName(doc.data().name);
                  }}).catch((error) => {
              })
        }, []),
      );

    const SendComment = () => {
        if (!post) {
         Alert.alert("Comentário vazio.")
        } else {
         const gennerate: string = uuid();
         db.collection("Posts").doc(Id).collection("Coments").doc(gennerate).set({
           IdComment: gennerate,
           DataComment: hoje,
           Nome: name,
           Comment: post,
       })
       .catch((error) => {
           console.error("Error writing document: ", error);
       });
       }
       setPost("")
    }
   

  return (      
    <View style={styles.container}>
      <View style={styles.postSubmite}>
        <Icon name="user" type="feather" color="#73788B" style={styles.avatar}/>
            <TextInput 
            multiline={true} 
            numberOfLines={2} 
            style={{ flex: 1 }}
            placeholder="Digite seu comentário!"
            value={post}
            onChangeText={(value) => setPost(value)}>
            </TextInput>
        <TouchableOpacity style={styles.submite} onPress={SendComment}>
            <Icon name="send" type="Feather" color="#73788B"/>
        </TouchableOpacity>
      </View>


      <Text>{Id}</Text>
      <Text>{NomePost}</Text>
      <Text>{Post}</Text>
      <Text>{DataPost}</Text>
      {data.map((dev) => {
        return(
            <View style={styles.feedItem} key={dev.id}>
            <Icon name="user" type="feather" color="#73788B" style={styles.avatar}/>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={styles.name}>{dev.Nome}</Text>
                  <Text style={styles.post}>{dev.Comment}</Text>
                  <Text style={styles.timestamp}>{dev.DataComment}</Text>
                </View>
                <TouchableOpacity>
                    <Icon name='heart' type='feather' color="#73788B"/>
                </TouchableOpacity>
              </View>
              
              <View style={{ flexDirection: "row" }}>
              </View>
            </View>
          </View>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
  },
  postSubmite: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
    submite: {
    alignItems: "flex-end",
    marginHorizontal: 32
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 8
  },
  post: {
    marginTop: 0,
    fontSize: 14,
    color: "#838899"
  },
})

export default Postshow;