import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Title, Caption, Drawer, Text } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';

export function DrawerContent ({ navigation }, props) {

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");

    function logout() {
        firebase.auth().signOut().then(() => {
          navigation.navigate('Logout');
          setIsLoading(false);
        }).catch((error) => {
        })
    }
    
    useEffect(() => {
        setTimeout(() => {
        const user = firebase.auth().currentUser;
            if (user) {
                setEmail(user.email);
                setIsLoading(false)
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
    }, [])

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
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {... props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View>                            
                            <Title style={styles.title}>
                                {name}
                                </Title>
                            <Caption style={styles.caption}>{email}</Caption>
                        </View>
                    </View>
                </View>

                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon
                            name="person-circle"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Usuário"
                        onPress={() => {navigation.navigate('Configurações do usuárioScreen')}}
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon
                        name="arrow-undo-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sair"
                    onPress={logout}
                />
            </Drawer.Section>
        </View>
    )
}}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
