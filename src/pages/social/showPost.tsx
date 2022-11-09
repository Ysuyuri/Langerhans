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
    const hoje = `${dayjs().toString()}`
    const uidPost = props.route.params.uidPost
    
    const [data, setData] = useState([])
    const [post, setPost] = useState("")
    const [name, setName] = useState("")
    const [uid, setUid] = useState('')

    useFocusEffect(
        React.useCallback(() => {
          const user = firebase.auth().currentUser
          setUid(user.uid)
            firebase.firestore().collection("Posts").doc(Id).collection("Comment").onSnapshot((querySnapshot) => {
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
         const gennerate2: string = uuid();
         db.collection("Posts").doc(Id).collection("Comment").doc(gennerate).set({
           Id: gennerate,
           IdComment: gennerate2,
           DataComment: hoje,
           Nome: name,
           uid: uid,
           Comment: post,
       })
       .catch((error) => {
           console.error("Error writing document: ", error);
       });
       }
       setPost("")
    }
   
    data.sort((a, b) => (a.DataComment < b.DataComment) ? 1 : -1)

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
            <Icon name="send" type="feather" color="#73788B"/>
        </TouchableOpacity>
      </View>

      <View style={styles.feedItemPub}>
            <Icon name="user" type="feather" color="#73788B" style={styles.avatar}/>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={styles.name}>{NomePost}</Text>
                  <Text style={styles.post}>{Post}</Text>
                  <Text style={styles.timestamp}>{moment(DataPost).format('DD/MM/YYYY HH:mm')}</Text>
                </View>
              </View>
              
              <View style={{ flexDirection: "row" }}>
              </View>
            </View>
          </View>
      {data.map((dev) => {
        return(
            <View style={styles.feedItem} key={dev.IdComment}>
            <Icon name="user" type="feather" color="#73788B" style={styles.avatar}/>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={styles.name}>{dev.Nome}</Text>
                  <Text style={styles.post}>{dev.Comment}</Text>
                  <Text style={styles.timestamp}>{moment(dev.DataComment).format('DD/MM/YYYY HH:mm')}</Text>
                </View>

                {(() => {
                  if (uidPost == uid) {
                    return (
                      <TouchableOpacity onPress={() => {db.collection("Posts").doc(Id).collection("Comment").doc(dev.Id).delete()}}>
                        <Icon name='trash-2' type='feather' color="#73788B"/>
                      </TouchableOpacity>
                    )
                  } else if (uid == dev.uid) {
                    return (
                      <TouchableOpacity onPress={() => {db.collection("Posts").doc(Id).collection("Comment").doc(dev.Id).delete()}}>
                        <Icon name='trash-2' type='feather' color="#73788B"/>
                      </TouchableOpacity>
                    )
                  } else {
                    return (
                      <View/>
                    )
                  }
                })()}
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
    marginVertical: 8,
    marginTop: 0,
    marginBottom: 0
  },
  feedItemPub: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
    borderBottomColor: "black",
    borderBottomWidth: 1,
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