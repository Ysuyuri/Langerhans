import React from "react";
import { Button, StyleSheet, Text, View, Alert } from "react-native";
import getRealm from "../../infraestructure/realm";
import { IImagem, IImagemObject } from "../../business/models/interface/IImagem";

const Home = () => {

    const writeUsuario = async () => {
        const realm = await getRealm();

        try {
            realm.write(() => {
                realm.create<IImagem>("Imagem", {
                    _id: 12,
                    filename: "teste",
                    type: "teste",
                    uri: "teste",
                  });
                });
        } catch (error) {
            console.log(error);
        }
    }


    const getUsuario = async () => {
        const realm = await getRealm();

        try {
            const data = realm.objects<IImagemObject>("Imagem");
            console.log(data);
        }   catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello from home!</Text>
            <Button title="Write Usuario" onPress={writeUsuario} />
            <Button title="Get Usuario" onPress={getUsuario} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        marginBottom: 20,
    },
  });

export default Home;