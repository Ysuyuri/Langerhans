import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { useState, ChangeEvent } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase';
import { Icon } from '@rneui/themed';
import { v4 as uuid } from 'uuid'
import 'react-native-get-random-values';

import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

const Social = (props) => {

  const db = firebase.firestore();
  const dayjs = require('dayjs')

  const hoje = `${dayjs().toString()}`
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState('');
  const [data, setData] = useState([])
  const [post, setPost] = useState("")

  useFocusEffect(
    React.useCallback(() => {
        setTimeout(() => {
            const user = firebase.auth().currentUser;
                if (user) {
                    setIsLoading(false)
                    setUid(user.uid);
                    firebase.firestore().collection("Posts").onSnapshot((querySnapshot) => {
                      const items = []
                      querySnapshot.forEach((doc) => {
                        items.push(doc.data())
                      })
                      setData(items)
                    })
                } else {
            }
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    const db = firebase.firestore();
                    const userEmail = firebase.auth().currentUser.email;
                    const docRef = db.collection("Users").doc(userEmail);
    
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            setName(doc.data().name);
                        }}).catch((error) => {
                    })
                }
        })}, 0);
    }, []),
  );

  const SendPost = () => {
     if (!post) {
      Alert.alert("Nenhum pensamento foi inserido.")
     } else {
      const gennerate: string = uuid();
      db.collection("Posts").doc(gennerate).set({
        IdPost: gennerate,
        DataPost: hoje,
        Nome: name,
        Post: post,
        uid: uid,
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    }
    setPost("")
  }

  data.sort((a, b) => (a.DataPost < b.DataPost) ? 1 : -1)

  return (
    <View style={styles.container}>
      <View style={styles.postSubmite}>
      <Icon name="user" type="feather" color="#73788B" style={styles.avatar}/>
        <TextInput 
        multiline={true} 
        numberOfLines={3} 
        style={{ flex: 1 }}
        placeholder="No que você está pensando?"
        value={post}
        onChangeText={(value) => setPost(value)}>
        </TextInput>
      <TouchableOpacity style={styles.submite} onPress={SendPost}>
        <Icon name="send" type="feather" color="#73788B"/>
      </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.feed}>
      {data.map((dev) => {
          return(
              <View style={styles.feedItem} key={dev.IdPost}>
                <Icon name="user" type="feather" color="#73788B" style={styles.avatar}/>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                      <Text style={styles.name}>{dev.Nome}</Text>
                      <Text style={styles.timestamp}>{moment(dev.DataPost).format('DD/MM/YYYY HH:mm')}</Text>
                    </View>
                    {(() => {
                    if (dev.uid == uid) {
                      return (
                        <TouchableOpacity onPress={() => props.navigation.navigate('EditPost', {uidPost: dev.uid, post: dev.Post, datapost: dev.DataPost, idPost: dev.IdPost})}>
                          <Icon name="edit" type="feather" color="#73788B"/>
                        </TouchableOpacity>
                      )
                    } else {
                      return (
                        <View/>
                      )
                    }
                    })()}
                  </View>
                  <Text style={styles.post}>{dev.Post}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('PostShow', {comentUid: dev.IdPost, post: dev.Post, datapost: dev.DataPost, usuPost: dev.Nome, uidPost: dev.uid})}>
                      <Icon name="comment" type="EvilIcons" color="#73788B" style={{ marginTop: 10 }}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          )
        })}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
  },
  postSubmite: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center"
  },
  submite: {
    alignItems: "flex-end",
    marginHorizontal: 32
  },
  header: {
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset:  {width: 0, height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTittle:{
    fontSize: 20,
    fontWeight: "500"
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
})

export default Social;