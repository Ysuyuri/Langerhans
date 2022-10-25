import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from 'react';
import { Icon } from '@rneui/themed';
import firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";

const EditPost = (props, {navigation}) => {

    const [uid, setUid] = useState('')

    useFocusEffect(
        React.useCallback(() => {
          const user = firebase.auth().currentUser
          setUid(user.uid)
        }, []),
      );

    const db = firebase.firestore();

    const uidUsu = props.route.params.uidPost;
    const pub = props.route.params.post;
    const datapost = props.route.params.datapost;
    const idPost = props.route.params.idPost;

    const [post, setPost] = useState("")

    const PostEdit = () => {
         db.collection('Posts').doc(idPost).update({Post: post})
         props.navigation.navigate('Social')
    }

    return(
        <View style={styles.container}>
            <View style={styles.postSubmite}>
                <Icon name="user" type="feather" color="#73788B" style={styles.avatar}/>
                <TextInput 
                multiline={true} 
                numberOfLines={3} 
                style={{ flex: 1 }}
                placeholder={pub}
                value={post}
                onChangeText={(value) => setPost(value)}>
                </TextInput>
                <View style={styles.submite}>
                    <TouchableOpacity onPress={PostEdit}>
                    <Icon name="send" type="feather" color="#73788B"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => {
                        db.collection("Posts").doc(idPost).delete()
                        props.navigation.navigate('Social')}}>
                    <Icon name="trash-2" type="feather" color="#73788B"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "white"
      },
    postSubmite: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center"
      },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
      },
    submite: {
        marginTop: 15,
        alignItems: "flex-end",
        marginHorizontal: 25
      },
})

export default EditPost;