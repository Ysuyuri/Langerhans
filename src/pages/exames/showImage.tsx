import React, { useState } from "react";
import { Image, View, Text, Dimensions, StyleSheet } from "react-native";
import { Provider, Portal, FAB } from "react-native-paper";
import firebase from 'firebase';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

var RNFS = require('react-native-fs')

const ImgShow = (props, {navigation}) => {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const db = firebase.firestore();
    const uid = props.route.params.uid;
    const filename = props.route.params.name
    const uri = props.route.params.uri;

    function Apagar() {
        db.collection(uid).doc(filename).delete();
        RNFS.unlink(uri);
        props.navigation.navigate('ExamesScreen')
    }

    if (uri == '') {
        props.navigation.navigate('ExamesScreen')
    } else {
    return (
        <Provider>
        <View style={styles.container}>
            <Image
            source={{uri: uri}} 
            style={{
                resizeMode: "contain",
                height: '100%',
                width: '100%'
            }}
            />
        </View>
        </Provider>
    )}
}
const styles = StyleSheet.create({
    container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    }
})


export default ImgShow