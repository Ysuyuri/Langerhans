import { View, Text, StyleSheet,  } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase';

const Social = () => {

  const [uid, setUid] = useState('');
  const [data, setData] = useState([])

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social</Text>  
      </View>
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
  }
})

export default Social;