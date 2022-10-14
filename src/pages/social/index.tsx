import { View, Text, StyleSheet, TouchableOpacity, SegmentedControlIOSComponent,  } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase';
import { Icon } from '@rneui/themed';
import uuid from 'react-native-uuid';

const Social = () => {

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState('');
  const [data, setData] = useState([])

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

  function Teste() {
    console.log(uuid.v4())
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social</Text>  
      </View>
      <View style={styles.feed}>
      {data.map((dev) => {
          return(
              <View style={styles.feedItem} key={dev.uid}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                      <Text style={styles.name}>{dev.Nome}</Text>
                      <Text style={styles.timestamp}>{dev.DataPost}</Text>
                    </View>

                    <Icon name="more-horiz" type="MaterialIcons" color="#73788B"/>
                  </View>
                  <Text style={styles.post}>{dev.Post}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="comment" type="EvilIcons" color="#73788B" style={{ marginTop: 10 }} />
                  </View>
                </View>
              </View>
          )
        })}
      </View>
        <TouchableOpacity onPress={Teste}> 
            <Text>Concluir Cadastro</Text>          
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
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
  }
})

export default Social;